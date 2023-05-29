import { ethers } from "ethers";

export async function connect(address, abi, signer) {
	let contract = new ethers.Contract(address, abi, signer);
	return contract;
}

export async function connectCheck(address, abi, signer) {
	let contract = new ethers.Contract(address, abi, signer);
	return contract;
}
