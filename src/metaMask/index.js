import Vue from "vue";

import {
    getMyBalance as uptickevm_getMyBalance,
    getAccountInfo as uptickevm_getAccountInfo,
    getUptickAddress as uptickevm_getUptickAddress,
    mintNft as uptickevm_mintNft,
} from '@/metaMask/evm/index';


import chain_iris_w from "@/assets/chain_iris_w.png";
import chain_uptick_w from "@/assets/chain_uptick_w.png";

let chainName = "UPTICK EVM";

export function wallet() {
    let wt = {};

    if(chainName == "UPTICK EVM") {
        wt = {
            getMyBalance: uptickevm_getMyBalance,
            getAccountInfo: uptickevm_getAccountInfo,
            getUptickAddress: uptickevm_getUptickAddress,
            mintNft:uptickevm_mintNft,
        };
    }
    return wt;
};

export function init(chain) {
    if(chain) chainName = chain;
    Vue.prototype.$chainName = chain;
    
    let unit = chain=="IRIS" ? "IRIS":
               chain=="UPTICK" ? "UPTICK":
               chain=="UPTICK EVM" ? "UPTICK":
               "";
    Vue.prototype.$walletUnit = unit;

    let img = chain=="IRIS" ? chain_iris_w:
              chain=="UPTICK" ? chain_uptick_w:
              chain=="UPTICK EVM" ? chain_uptick_w:
              "";
    Vue.prototype.$walletIcon = img;

    Vue.prototype.$wallet = wallet(chain);
    Vue.filter("$unitFormat", function(val) {
        return val.replaceAll("$UNIT", unit);
    });
}
