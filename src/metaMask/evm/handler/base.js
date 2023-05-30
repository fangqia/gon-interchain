import { ethers } from "ethers";
let { bech32 } = require('bech32');
import Web3 from 'web3';
const web3Obj = new Web3("https://json-rpc.uptick.network");

const fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

export async function getBalance() {
    // const account = await getAccounts();
    // 根据缓冲获取地址
    const json = localStorage.getItem("key_user");
    let address = JSON.parse(json);
    let amt = web3Obj.eth.getBalance(address.did);
    return amt;
}

export async function getAccounts() {
    let web3Provider;
    web3Provider = new ethers.providers.Web3Provider(window.ethereum);

    let signer = await web3Provider.getSigner();
    //   let chainId = await provider.request({ method: "eth_chainId" });
    //    let address = await signer.getAddress();
    return signer;
}

// async function generateWeb3() {
//     if(window.walletType == 3) {
//         //  Create WalletConnect Provider
//         const provider = new WalletConnectProvider({
//             infuraId: "7e31d49d7c8a48f4a4539aff9da768e7", // Required
//         });
//         await provider.enable();
//         //  Create Web3
//         const web3 = new Web3(provider);
//         return web3;
//     }
//     return new Web3(window.ethereum);
// }


export function getUptickAddress(evmAddress) {

    //xxl TODO from evm
    //let preFix = "uptick"
    //let uptickAddress = Base58.encode(fromHexString(evmAddress));

    let words = bech32.toWords(fromHexString(evmAddress));
    return bech32.encode('uptick', words)

    //return preFix + uptickAddress;
}

export async function addNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x492',
                chainName: 'Uptick Origin',
                nativeCurrency: {
                    name: 'UptickToken',
                    symbol: 'UOC', // 2-6 characters long
                    decimals: 18,

                },
                rpcUrls: ['https://json-rpc.origin.uptick.network'],
                blockExplorerUrls: ['https://evm-explorer.origin.uptick.network/'],
            }],
        });
    }
    catch (error) {
        console.error(error);
    }
}

const { utils } = require('ethers')
export async function transfer(toAddress, value, memo) {
    let hexValue = utils.parseEther(value).toHexString();
    //xxl TODO read from .env
    // const toAddress2 = process.env.VUE_APP_AUPTICK_PREFIX;
    const gasPrice = '0x2540be400'
    const gas = '0x7a1200'

    const account = await getAccounts();
    let address = await account.getAddress();

    const transactionParameters = {
        gasPrice, gas, to: toAddress, from: address, value: hexValue, data: memo,
    };

    // txHash is a hex string
    // As with any RPC call, it may throw an error
    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });
    return txHash
    //console.log(txHash);
}

// var Web3 = require('web3');
export async function getGasPriceAndGasLimit() {



    let gasPrice = 10000000000;
    //xxl TODO setting from .evn
    let gasLimit = "0x7a1200";


    return { gasPrice, gasLimit };

}