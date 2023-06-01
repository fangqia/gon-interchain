// const {
//   ERR_MSG
// } = require("../utils/constant")

const ERR_MSG = {
  CHAIN_NOT_MATCH:{
      NO:-1001,
      MSG:"the chain id is not correct"
  }
}

const { utils } = require('ethers')

const Web3 = require('web3');

export const getMatamaskWeb3 = async () => {
	var web3;
	if (window.ethereum) {
		// Modern dapp browsers
		web3 = new Web3(window.ethereum);
		try {
			console.log("连接metamask钱包")
			await window.ethereum.enable();
			await window.ethereum.eth_requestAccounts();
		} catch (error) {
			console.log('denied');
		}
	} else {
		this.$Message.error('请连接metamask钱包！');
	}
	let accounts = await web3.eth.getAccounts();
	return accounts;
};


export const tranferValueByMetaMask = async(toAddress,value,chainId,gasPrice=0,gasLimit=0x7a1200,data="0x") => {

  if (window.ethereum) {
    try {
      
      // console.log(1);
      console.log(window.ethereum.networkVersion);

      if(window.ethereum.networkVersion != chainId){
        return ERR_MSG.CHAIN_NOT_MATCH
      }

      // console.log(2);
      let web3 = new Web3(window.ethereum);
      if(gasPrice == 0){
        // console.log(2.1);
        console.log(web3.eth);

        gasPrice = await web3.eth.getGasPrice();
        console.log(gasPrice);
      }

      // console.log(3);
      let sendValue = utils.parseEther(value);

      console.log([
        gasPrice,
        gasLimit.toString(),
        toAddress,
        window.ethereum.selectedAddress,
        sendValue.toHexString(),
        data
      ]);
 
      let transactionParameters = {};
      transactionParameters = {
        // gasPrice: gasPrice.toString(), // customizable by user during MetaMask confirmation.
        // gas: gasLimit.toString(), // customizable by user during MetaMask confirmation.
        to: toAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: sendValue.toHexString(), // Only required to send ether to the recipient from the initiating external account.
        data:data, // Optional, but used for defining smart contract creation and interaction.
      };
      
      // txHash is a hex string
      // As with any RPC call, it may throw an error
      // console.log(4);
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      return txHash;
    }catch(e){
      // console.log(e);
      console.log('tranferValueByMetaMask denied');
    
    }
  }
  else {
		this.$Message.error('请连接metamask钱包！');
	}
}

