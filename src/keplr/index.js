import store from "../store/index.js"
import { getIirsAccoutInfo } from "./iris/wallet";
   
   async function addIRISNetwork() { 
    if (!window.getOfflineSigner || ! window.keplr) {
        console.log('Please install keplr extension');
    } else {
        if (window.keplr.experimentalSuggestChain) {
            try {
                // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
                // cosmoshub-3 is integrated to Keplr so the code should return without errors.
                // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
                // If the user approves, the chain will be added to the user's Keplr extension.
                // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
                // If the same chain id is already registered, it will resolve and not require the user interactions.
                await window.keplr.experimentalSuggestChain({
                  "chainId": "gon-irishub-1",
                  "chainName": "Irishub GON",
                  "rpc": "https://rpc-gon-irishub.omniflix.io",
                  "rest": "https://api-gon-irishub.omniflix.io",
                  "stakeCurrency": {
                    "coinDenom": "IRIS",
                    "coinMinimalDenom": "uiris",
                    "coinDecimals": 6
                  },
                  "bip44": {
                    "coinType": 118
                  },
                  "bech32Config": {
                    "bech32PrefixAccAddr": "iaa",
                    "bech32PrefixAccPub": "iaapub",
                    "bech32PrefixValAddr": "iaavaloper",
                    "bech32PrefixValPub": "iaavaloperpub",
                    "bech32PrefixConsAddr": "iaavalcons",
                    "bech32PrefixConsPub": "iaavalconspub"
                  },
                  "currencies": [
                    {
                      "coinDenom": "IRIS",
                      "coinMinimalDenom": "uiris",
                      "coinDecimals": 6
                    }
                  ],
                      "feeCurrencies": [
                        {
                          "coinDenom": "IRIS",
                            "coinMinimalDenom": "uiris",
                            "coinDecimals": 6,
                            "gasPriceStep": {
                              "low": 0.01,
                              "average": 0.025,
                              "high": 0.25
                            }
                          }
                        ],
                        "coinType": 118,
                        "beta": true
					
			
				
                });

                // location.reload();
            } catch {
                alert("Failed to suggest the chain");
                // location.reload();
            }
        } else {
            alert("Please use the recent version of keplr extension");
        }
    }
}

async function addUptickNetwork() { 
  
if (!window.getOfflineSigner || !window.keplr) {
   console.log('Please install keplr extension');
} else {
   if (window.keplr.experimentalSuggestChain) {
       try {
           // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
           // cosmoshub-3 is integrated to Keplr so the code should return without errors.
           // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
           // If the user approves, the chain will be added to the user's Keplr extension.
           // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
           // If the same chain id is already registered, it will resolve and not require the user interactions.
           await window.keplr.experimentalSuggestChain({
            "chainId": "origin_1170-1",
            "chainName": "Uptick Origin",
            // "rpc": "https://rpc.origin.uptick.network",
            "rpc": "http://54.179.233.10:26657",
            "rest": "https://rest.origin.uptick.network",
            "stakeCurrency": {
              "coinDenom": "UOC",
              "coinMinimalDenom": "auoc",
              "coinDecimals": 18,
              "coinGeckoId": "unknown"
            },
            "bip44": {
              "coinType": 60
            },
            "bech32Config": {
              "bech32PrefixAccAddr": "uptick",
              "bech32PrefixAccPub": "uptickpub",
              "bech32PrefixValAddr": "uptickvaloper",
              "bech32PrefixValPub": "uptickvaloperpub",
              "bech32PrefixConsAddr": "uptickvalcons",
              "bech32PrefixConsPub": "uptickvalconspub"
            },
            "currencies": [
              {
                "coinDenom": "UOC",
                "coinMinimalDenom": "auoc",
                "coinDecimals": 18,
                "coinGeckoId": "unknown"
              }
            ],
            "feeCurrencies": [
              {
                "coinDenom": "UOC",
                "coinMinimalDenom": "auoc",
                "coinDecimals": 18,
                "coinGeckoId": "unknown",
                "gasPriceStep": {
                  "low": 20000000000,
                  "average": 25000000000,
                  "high": 40000000000
                }
              }
            ],
            "coinType": 60,
            "features": [
              "ibc-transfer",
              "ibc-go",
              "eth-address-gen",
              "eth-key-sign"
            ],
            "beta": true
     
 
   
           });



           // location.reload();
       } catch {
           alert("Failed to suggest the chain");
           // location.reload();
       }
   } else {
       alert("Please use the recent version of keplr extension");
   }
}
}
export const getkeplrIrisAddress = async () => {
	var web3;
	if (window.keplr) {
		// Modern dapp browsers
		try {
			const chainId = "gon-irishub-1";
			await window.keplr.enable(chainId);
			web3 = await window.getOfflineSigner(chainId);

			//xxl TODO tochange the keystore
			window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
			
		} catch (error) {
			console.log('denied');
		}
	} else {
		this.$Message.error('请连接kepla钱包！');
	}
	 let account = await web3.getAccounts();
	 console.log(account)
	 
	//  var balance = web3.eth.getBalance("iaa1xhhf3a80n7zamu32dyku77lactynx9sgs0vvz4");

	//  console.log("accountBalance -----")
	//  console.log(balance)

	 return account[0].address
};
export const getkeplrUptickAddress = async () => {
	var web3;
	if (window.keplr) {
		// Modern dapp browsers
		try {

			const chainId = "origin_1170-1";
			await window.keplr.enable(chainId);
			web3 = await window.getOfflineSigner(chainId);

			//xxl TODO tochange the keystore
			window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
			
		} catch (error) {
			console.log('denied');
		}
	} else {
		this.$Message.error('请连接kepla钱包！');
	}
	 let account = await web3.getAccounts();
	 console.log(account)
	 
	//  var balance = web3.eth.getBalance("iaa1xhhf3a80n7zamu32dyku77lactynx9sgs0vvz4");

	//  console.log("accountBalance -----")
	//  console.log(balance)

	 return account[0].address
};
export const keplrKeystoreChange = async () => {
  console.log('keplrKeystoreChange');
  window.removeEventListener("keplr_keystorechange", keplrKeystoreChange);
  let account = await getkeplrIrisAddress();
  store.commit("SET_DID", account.toLowerCase());
          
         // uptick Address
    let uptickAccount = await getkeplrUptickAddress();
  store.commit("SET_UPTICK_DID", uptickAccount.toLowerCase());
  let accountInfo =  await getIirsAccoutInfo();
  localStorage.setItem('userInfo',JSON.stringify(accountInfo))
  location.reload();


  
}
export async function initWallet() {
   await  addIRISNetwork();
   await  addUptickNetwork();
}