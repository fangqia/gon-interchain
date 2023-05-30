import {
    connect,
    connectCheck,
} from "./common";

import {
    abi
} from "../artifact/Uptick721.json";

const base = require('./base');

// //xxl todo get from .evn
// let contractAddress = "0x679e2af9c4571c5617fa1df4f3094eb62d90f6ee";
// let contractAddressPlatform = "0xd3e379f75d08ba91f632b363f021ceda01d94984";

// export function setContractAddress(address, platformAddress) {
//     if (address) {
//         contractAddress = address;
//     }
//     if (platformAddress) {
//         contractAddressPlatform = platformAddress;
//     }
// }

export async function mintNft(toAddress, contractAddress, tokenId, uri) {
    try {
        const account = await base.getAccounts();
        let address = await account.getAddress();
        let chainId = await account.getChainId();

        if (address.toLowerCase() != toAddress.toLowerCase()) {
            throw new Error("Metamask address are different Keplr address")
        }

        let contract
        if (!contract) {
            contract = await connect(contractAddress, abi, account);
        }
        let gasSetting = await base.getGasPriceAndGasLimit();
        console.log("gasSetting", gasSetting);
        let result = await contract.mintByCreatorFee(
            toAddress,
            tokenId,
            uri,//baseurl
            "0",//mintByCreatorFee
            { gasPrice: gasSetting.gasPrice, gasLimit: gasSetting.gasLimit }
        );
        console.log("result", result);
        debugger
        return {
            "address": toAddress,
            "contractAddress": contractAddress,
            "tokenId": tokenId,
            "uri": uri,
            "hash": result.hash,
            "chainId": chainId
        };
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

}


