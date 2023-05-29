import {
    connect,
    connectCheck,
} from "./common";

import {
    abi
} from "../artifact/Uptick721.json";

const base = require('./base');

//xxl todo get from .evn
let contractAddress = "0x679e2af9c4571c5617fa1df4f3094eb62d90f6ee";
let contractAddressPlatform = "0xd3e379f75d08ba91f632b363f021ceda01d94984";

export function setContractAddress(address, platformAddress) {
    if (address) {
        contractAddress = address;
    }
    if (platformAddress) {
        contractAddressPlatform = platformAddress;
    }
}


export async function mintNft(toAddress, tokenId, baseurl, mintByCreatorFee) {
    const account = await base.getAccounts();

    let contract
    if (!contract) {
        contract = await connect(contractAddress, abi, account);
    }
    let gasSetting = await base.getGasPriceAndGasLimit();
    console.log("gasSetting", gasSetting);
    let result = await contract.mintByCreatorFee(
        toAddress, tokenId, baseurl, mintByCreatorFee,
        { gasPrice: gasSetting.gasPrice, gasLimit: gasSetting.gasLimit }
    );
    return result;
}

 
