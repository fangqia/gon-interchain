// import Vue from "vue";
import Web3 from 'web3'
const md5 = require('md5');
const web3Obj = new Web3();
let base = require('./handler/base.js');
let uptick721 = require('./handler/uptick721.js');

import $store from "../../store";

(function () {
    if (window.ethereum) {
        base.addNetwork();
        init();
    }
})();

async function handleAccountsChanged(accounts) {
    if (accounts.length == 0) return;

    let address = accounts[0];
    let did = getUptickAddress(address.substr(2));
    $store.commit('SET_DID', address);
    address = address.toLowerCase();
    window.bscAddress = address;
    localStorage.setItem("key_user", JSON.stringify({ user: true, did: $store.state.did, bscAddress: address }));

    location.reload();
}

export async function getMyBalance() {
    let balance = { amount: await base.getBalance() };
    let amt = web3Obj.utils.fromWei(balance["amount"], "ether");

    balance["format"] = parseFloat(amt).toFixed(2);
    let mount = balance.format;

    localStorage.setItem("key_balance", mount);
    return balance;
}

export async function getAccountInfo() {
    await checkmetamaskconnect();
    debugger
    let account = await base.getAccounts();
    return account;
}

const checkmetamaskconnect = async () => {
    var web3;
    if (window.ethereum) {
        // Modern dapp browsers
        web3 = new Web3(window.ethereum);
        try {
            localStorage.setItem("LogIn", true);
            console.log("连接metamask钱包")
            await window.ethereum.enable();
            await window.ethereum.eth_requestAccounts();

        } catch (error) {
            console.log('denied');
        }
    } else {
        this.$Message.error('请连接metamask钱包！');
    }

};

export function getUptickAddress(evmAddress) {
    return base.getUptickAddress(evmAddress);
}


function getDenomName(name, address) {

    let denomName = name + "_" + Math.floor(Date.now() / 1000) + "_" + address.substr(address.length - 4);
    return denomName;

}

function getDenomId(name) {

    let preFix = process.env.VUE_APP_PREFIX;
    return preFix + md5(name);

}


export async function mintNft(toAddress, tokenId) {
    debugger
    let transferFrom = await uptick721.mintNft(toAddress, tokenId, "", "");
    console.log(transferFrom);

    return transferFrom;
}


export function init() {
    window.ethereum.on('accountsChanged', handleAccountsChanged);
}


