const iris = require("@irisnet/irishub-sdk");

const BigNumber = require('big-number');
const long = require('long');
const chainId = process.env.VUE_APP_IRIS_CHAIN_ID;
const md5 = require('md5');

import {
	getRanHex
} from "../../utils/helper";

//构建 iris-sdk 配置
let config = {
	node: "https://rpc-gon-irishub.omniflix.io",
	chainNetwork: "https://api-gon-irishub.omniflix.io",
	chainId: "gon-irishub-1",
	//gas: process.env.VUE_APP_IRIS_BASE_GAS,
	gas: '250000',
	fee: {
		denom: 'IRIS',
		amount: '75000'
	},
};


// irisnet sdk 初始化
const client = iris
	.newClient(config)
	.withKeyDAO({
		write: () => {},
		read: () => {
			return '';
		}
	})
	.withRpcConfig({
		timeout: 50000
	});

export async function getMyBalance() {

	let accountInfo = await getAccountInfo()
	if (accountInfo != null) {
		let result = await client.bank.queryBalance(accountInfo.bech32Address, process.env.VUE_APP_IRIS_DENOM)
		let balance = result["balance"]
		balance["format"] = balance["amount"] / 1000000
		let mount = balance.format
		localStorage.setItem("key_balance", mount);
		return balance;
	} else {
		localStorage.setItem("key_balance", 0);
	}
	return 0;


}

// let tx = await issueDenomAndMint(
//   orgName,
//   sender,
//   recipient,
//   uri,
//   data,
//   amount,
//   fee,
//   addminAddress,
// );

export async function issueDenomAndMint(
	orgName,
	sender,
	recipient,
	uri,
	data,
	amount,
	fee,
	adminAddress,
) {

	let accountInfo = await getAccountInfo()
	let msgs = [];
	let name = getDenomName(orgName, accountInfo.bech32Address);
	let id = getDenomId(name)

	let value = {
		id,
		name,
		schema: getDenomSchema(),
		sender
	}
	let msg = {
		type: iris.types.TxType.MsgIssueDenom,
		value
	}
	msgs.push(msg);

	for (var i = 0; i < amount; i++) {

		let nftID = getNftId();
		msg = {
			type: iris.types.TxType.MsgMintNFT,
			value: {
				id: nftID,
				denom_id: id,
				name: name,
				uri: uri,
				data: data,
				sender: accountInfo.bech32Address,
				recipient: recipient
			}
		}
		msgs.push(msg);

	}

	console.log("xxl ---" + adminAddress);
	console.log(msgs);
	if (fee > 0) {
		msgs = addSendMsg(msgs, accountInfo.bech32Address, adminAddress, fee);
	}
	let txInfo = await signAndBroadcastTx(accountInfo, msgs);
	console.log("https://gon.ping.pub/iris/tx/" + txInfo.hash)
	return {
		txInfo,
		denomInfo: msgs
	}


}

export async function issueDenom(
	orgName,
	sender,
	fee,
	adminAddress
) {

	console.log("xxl come to issueDenom 11");
	console.log([
		orgName,
		sender,
		fee,
		adminAddress
	])


	let accountInfo = await getAccountInfo()
	let msgs = [];
	let name = getDenomName(orgName, accountInfo.bech32Address);
	let id = getDenomId(name)

	let value = {
		id,
		name,
		schema: getDenomSchema(),
		sender
	}

	let msg = {
		type: iris.types.TxType.MsgIssueDenom,
		value
	}
	msgs.push(msg);
	msgs = addSendMsg(msgs, accountInfo.bech32Address, adminAddress, fee);

	//xxl accountInfo 
	console.log("xxl accountInfo msgs ... ");
	console.log(accountInfo);
	console.log(msgs);
	let txInfo = await signAndBroadcastTx(accountInfo, msgs);

	return {
		txInfo,
		denomInfo: value
	}

}

export async function tranferWithMemo(memo, amount, fee, adminAddress) {

	let accountInfo = await getAccountInfo()
	let msgs = [];
	msgs = addSendMsg(msgs, accountInfo.bech32Address, adminAddress, amount);
	msgs = addSendMsg(msgs, accountInfo.bech32Address, adminAddress, fee);

	//xxl tranferWithMemo
	console.log("xxl tranferWithMemo msgs");
	console.log(msgs);

	await signAndBroadcastTx(accountInfo, msgs, memo);

}

export async function transferNft(nftIds, denomId, sender, recipient, fee, adminAddress, memo) {

	let accountInfo = await getAccountInfo()
	let msgs = [];
	let len = nftIds.length;
	for (var i = 0; i < len; i++) {
		let msg = {
			type: iris.types.TxType.MsgTransferNFT,
			value: {
				id: nftIds[i],
				denom_id: denomId,
				sender,
				recipient
			}
		}
		msgs.push(msg)
	}
	if (fee > 0)
		msgs = addSendMsg(msgs, accountInfo.bech32Address, adminAddress, fee);

	//xxl transferNft
	console.log("xxl transferNft msgs");
	console.log(msgs);

	return await signAndBroadcastTx(accountInfo, msgs, memo);

}

export async function orderPay(fee, recipient, memo, denom) {
	let accountInfo = await getAccountInfo()
	let msgs = [];
	msgs = addSendMsg(msgs, accountInfo.bech32Address, recipient, fee, denom);

	//xxl transferNft
	console.log("xxl transferFee msgs");
	console.log(msgs);

	return await signAndBroadcastTx(accountInfo, msgs, memo);

}



export async function mintNFT(
	recipient,
	denomId,
	denomName,
	uri,
	data,
	amount,
	fee,
	adminAddress
) {

	if (window.keplr) {
		try {

			let accountInfo = await getAccountInfo()

			console.log("xxl mintNFT 1....");
			console.log(amount);
			console.log("xxl mintNFT 2....");

			// 构建 MintNFT Message 结构
			let msgs = [];
			for (var i = 0; i < amount; i++) {

				let msg = {
					type: iris.types.TxType.MsgMintNFT,
					value: {
						id: getNftId(),
						denom_id: denomId,
						name: denomName,
						uri: uri,
						data: data,
						sender: accountInfo.bech32Address,
						recipient: recipient
					}
				}
				msgs.push(msg);

			}

			console.log("xxl ---");
			console.log(msgs);

			msgs = addSendMsg(msgs, accountInfo.bech32Address, adminAddress, fee);
			let txInfo = await signAndBroadcastTx(accountInfo, msgs);
			return {
				txInfo,
				denomInfo: msgs
			}
		} catch (error) {
			console.log(error);
			console.log('mintNFT error');
		}
	} else {
		console.log('请连接kepla钱包 1！');
	}

}

function getDenomName(name, address) {

	let denomName = name + "_" + Math.floor(Date.now() / 1000) + "_" + address.substr(address.length - 4);
	return denomName;

}

function getDenomId(name) {

	let preFix = process.env.VUE_APP_PREFIX;
	return preFix + md5(name);

}

function getDenomSchema() {

	let json = {
		"type": "/uptick.souvenirCard"
	};
	return JSON.stringify(json);

}


function getNftId() {

	let preFix = process.env.VUE_APP_PREFIX;
	return preFix + getRanHex(16);

}

function NumberMul(arg1, arg2) {
	var m = 0;
	var s1 = arg1.toString();
	var s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) {
		console.log(e)
	}
	try {
		m += s2.split(".")[1].length;
	} catch (e) {
		console.log(e)
	}

	return (
		(Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
		Math.pow(10, m)
	);
}

function addSendMsg(msgs, fromAddress, adminAddres, fee, denom) {

	let retMsgs = msgs;
	let bigFee = BigNumber(NumberMul(fee, 1000000))
	let iconDenom;
	if (denom == null) {
		iconDenom = process.env.VUE_APP_IRIS_DENOM
	} else {
		iconDenom = denom
	}

	const amount = [{
		denom: iconDenom,
		amount: bigFee.toString()
	}];

	let feeMsg = {
		type: iris.types.TxType.MsgSend,
		value: {
			from_address: fromAddress,
			to_address: adminAddres,
			amount
		}
	}
	retMsgs.push(feeMsg)

	return retMsgs;

}

 export async function getAccountInfo() {

	try {
		await window.keplr.enable(chainId);
		// get accountInfo
		const accountKeplr = await window.keplr.getKey(chainId);
		console.log("xxl accountKeplr 000------");
		console.log(accountKeplr);

		const offlineSigner = window.getOfflineSigner(chainId);
		// const offlineSigner = window.getOfflineSignerOnlyAmino(chainId);
		const accounts = await offlineSigner.getAccounts();

		console.log("xxl accounts 011------");
		console.log(accounts);

		let accountIris = await client.auth.queryAccount(accountKeplr.bech32Address);

		console.log("xxl accountIris 111------");
		let accountNumber = accountIris["accountNumber"]
		let sequence = accountIris["sequence"]
		console.log(accountIris);
		if(accountNumber == undefined){
			accountNumber = accountIris["account"].value.accountNumber;
		}
		if(sequence == undefined){
			sequence = accountIris["account"].value.sequence;
		}

		return {
			address: accountKeplr["address"],
			bech32Address: accountKeplr["bech32Address"],
			pubKey: accountKeplr["pubKey"],
			accountNumber: accountNumber,
			sequence: sequence,
			isNanoLedger: accountKeplr["isNanoLedger"],
			name:accountKeplr['name']
		}
	} catch (error) {
		console.log(error);
		console.log('denied getAccountInfo');
	}

}

async function signAndBroadcastTx(accountInfo, msgs, memo = ' ') {
	try {
		console.log("0");
		//set fee
		let txLen = msgs.length;
		
		let pulsFee = BigNumber(process.env.VUE_APP_IRIS_STEP_GAS)
			.multiply(txLen - 1)
		let baseGas = process.env.VUE_APP_IRIS_BASE_GAS
		if (txLen == 1) {
			baseGas = 150000
		}
		let totalGas = BigNumber(baseGas)
			.plus(pulsFee)
			.toString();

		console.log("xxl totalGas 0....");
		console.log(totalGas);
		console.log("xxl totalGas 1....");


		client.withGas(totalGas);
		let totalFeeAmount = BigNumber(totalGas).divide(10).multiply(3).toString()
		let newFee = {
			denom: process.env.VUE_APP_IRIS_DENOM,
			amount: totalFeeAmount
		};


		client.withFee(newFee);

		client.auth.defaultStdFee = {
			"amount": [newFee],
			"gasLimit": totalGas
		}
		//


		// 构建 sdk base Tx
		let bTx = {};
		bTx.account_number = accountInfo.accountNumber;
		// xxl 0107 fix sequence is 0 bug
		//bTx.sequence = accountInfo.sequence == 0 ? 1:accountInfo.sequence;
		bTx.sequence = accountInfo.sequence + "";
		bTx.memo = memo;

		console.log(1);
		// 构建 sdk 离线签名结构
		console.log("xxl msgs 0....");
		console.log(msgs);
		console.log("xxl msgs 1....");
		//
		let tx_o = client.tx.buildTx(msgs, bTx);
		// console.log(Buffer.from(accountInfo.pubKey).toString('hex'));
		tx_o.setPubKey(Buffer.from(accountInfo.pubKey).toString('hex'));

		console.log(1.2);
		console.log(bTx);
		let signDoc = tx_o.getSignDoc(bTx.account_number, chainId);
		console.log(2);
		// 构建 keplr 离线签名结构
		

		// keplr 签名
		let s;
		// let s = await window.keplr.signDirect(keplr_signDoc_obj.chainId, accountInfo.bech32Address,
		// 		keplr_signDoc_obj);
	
		
			let keplr_signDoc_obj = {
			bodyBytes: signDoc.getBodyBytes(),
			authInfoBytes: signDoc.getAuthInfoBytes(),
			chainId: chainId,
			accountNumber: new long(signDoc.getAccountNumber())
		};
			s = await window.keplr.signDirect(keplr_signDoc_obj.chainId, accountInfo.bech32Address,
				keplr_signDoc_obj);
	
		

		console.log("keplr_sign_____",JSON.stringify(s));
		console.log(4);

		// 将 keplr 签名整合到 sdk 离线签名结构
		tx_o.addSignature(s.signature.signature);
		// 更新gas相关签名，防止修改GAS 导致失败
		tx_o.authInfo = iris.types.tx_tx_pb.AuthInfo.deserializeBinary(s.signed.authInfoBytes);
		// 更新gas相关签名，防止修改 导致失败
		tx_o.body = iris.types.tx_tx_pb.TxBody.deserializeBinary(s.signed.bodyBytes);


		console.log(5);
		console.log(tx_o);
		// tx_o.txData.msgs[0].type = 'cosmos-sdk/MsgSend'


		// sdk broadcast tx
		//let res = await client.tx.broadcast(tx_o, iris.types.BroadcastMode.Commit);
		let res = await client.tx.broadcast(tx_o, iris.types.BroadcastMode.Sync);
		console.log('res:', res);

		return res;

	} catch (error) {

		console.log(error);
		console.log('signAndBroadcastTx error');
	}
}


export async function quiryTx(tx) {

	console.log("xxl ....");
	try {

		let result = await client.tendermint.queryTx(tx);
		console.log(result);
		if (result.tx_result != null && result.tx_result.code == 0) {
			return {
				code: "0",
				log: ""
			}
		} else if (result.tx_result != null && result.tx_result.code != 0) {
			return {
				code: "-1",
				log: result.tx_result.log
			}
		} else {
			return {
				code: "-2",
				log: "cannot get log"
			}
		}


	} catch (e) {
		return [-3, e.toString()];
	}

}


export async function ibcTransferFromIris(
	source_port,
	source_channel,
	token,
	receiver,
	timeout_timestamp
) {

	try {
		let timeout_height = 0;
		if (!timeout_height && !timeout_timestamp) {
			// throw new SdkError("there must be one timeout_height or timeout_timestamp");
			console.log('there must be one timeout_height or timeout_timestamp');
			return;
		}

		let accountInfo = await getAccountInfo()
		console.log("xxl iris.types.TxType.MsgTransfer ", iris.types.TxType.MsgTransfer);
		console.log("xxl accountInfo ", accountInfo);

		const msgs = [{
			type: iris.types.TxType.MsgTransfer,
			value: {
				source_port: source_port,
				source_channel: source_channel,
				token: token,
				sender: accountInfo.bech32Address,
				receiver: receiver,
				timeout_height: timeout_height,
				timeout_timestamp: timeout_timestamp
			}
		}];
		console.log("xxl msgs", msgs);
		let txInfo = await signAndBroadcastTx(accountInfo, msgs);

		return {
			txInfo,
			denomInfo: msgs
		}
	} catch (error) {
		console.log(error);
		console.log('denied getAccountInfo');
	}
}
export async function getIirsAccoutInfo(params) {
	// let accountInfo = 	await getAccountInfo();
	await window.keplr.enable(chainId);
		// get accountInfo
		const accountKeplr = await window.keplr.getKey(chainId);
		console.log("xxl accountKeplr 000------");
		console.log(accountKeplr);

	debugger
	return {name:accountKeplr.name,address:accountKeplr.bech32Address}
}

export async function queryTokenFromIris() {

	try {
		let accountInfo = await getAccountInfo()
		console.log("wxl ---  accountInfo", accountInfo)
		if (accountInfo) {
			let allBal = await client.bank.queryAllBalances(accountInfo.bech32Address)
			console.log("xxl allBal : ", allBal);
			return allBal;
		} else {
			return ''
		}
	} catch (error) {
		return 0
	}





}
