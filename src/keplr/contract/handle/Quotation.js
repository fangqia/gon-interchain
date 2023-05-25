import { connect,getGasPriceAndGasLimit } from "./base";
import {
    abi
} from "../artifact/Quotation.json";

let contractAddress = '0x455a8c4e5768d7a3ef2d2fe6bcf299bdb51e70aa'

//设置合约地址
export function setContractAddress(platformAddress) {
    if(platformAddress) {
        contractAddress = platformAddress;
    }
}

//报价NFT
export async function quotedPrice(tokenAddress,tokenId,price) {
    let contract  = await connect(contractAddress,abi)
    let gasSetting = await getGasPriceAndGasLimit();
    let result = await contract.QuotedPrice(
        tokenAddress,tokenId,price
    );
    return result  
}
//获取价格
export async function getPrice(tokenAddress,tokenId) {
    let contract  = await connect(contractAddress,abi)
    let gasSetting = await getGasPriceAndGasLimit();
    let result = await contract.getPrice(
        tokenAddress,tokenId
    );
    return result  
}





