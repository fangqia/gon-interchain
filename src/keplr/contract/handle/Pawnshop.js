import { connect,getGasPriceAndGasLimit } from "./base";
import {
    abi
} from "../artifact/Pawnshop.json";

let contractAddress = '0x43be1f90567a0c55560a40912926b32050b490e4'


//设置合约地址
export function setContractAddress(platformAddress) {
    if(platformAddress) {
        contractAddress = platformAddress;
    }
}

//根据质押周期获取费率
export async function getRate(period) {
    try {
        let contract  = await connect(contractAddress,abi)

        let gasSetting = await getGasPriceAndGasLimit();
		let result = await contract.getRate(
            period
        );
        let fee = parseInt(result._hex,16)/1000;

		return fee;
    } catch (error) {
            console.log("error",error);
    }      
}
//质押NFT
export async function mortgageNft(tokenAddress,tokenId,period) {
        let contract  = await connect(contractAddress,abi)
        let gasSetting = await getGasPriceAndGasLimit();
		let result = await contract.Pledge(
            tokenAddress,tokenId,period
        );
        return result  
}
// 赎回NFT
export async function redeemNft(tokenAddress,tokenId,amount) {
    let contract  = await connect(contractAddress,abi)
    let gasSetting = await getGasPriceAndGasLimit();
    let result = await contract.Redeem(
        tokenAddress,tokenId,amount
    );
    return result  
}

//延期
export async function Postpone(tokenAddress,tokenId) {
    let contract  = await connect(contractAddress,abi)
    let gasSetting = await getGasPriceAndGasLimit();
    let result = await contract.Renewal(
        tokenAddress,tokenId
    );
    return result  
}
//获取质押信息
export async function getPledgeInfo(tokenAddress,tokenId) {
    let contract  = await connect(contractAddress,abi)
    let gasSetting = await getGasPriceAndGasLimit();
    let result = await contract.getPledgeInfo(
        tokenAddress,tokenId
    );
    return result  
}




