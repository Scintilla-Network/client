import IdentityManager from "./managers/IdentityManager/IdentityManager.js";
import NetworkManager from "./managers/NetworkManager/NetworkManager.js";
import AssetManager from "./managers/AssetManager/AssetManager.js";
import DriveManager from "./managers/DriveManager/DriveManager.js";
import GovernanceManager from "./managers/GovernanceManager/GovernanceManager.js";
import { Wallet } from "@scintilla-network/wallet";

class Client {
    constructor({ chainId = 'scintilla'} = {}) {
        this.network = new NetworkManager({chainId});
        this.identities = new IdentityManager(this.network);
        this.drive = new DriveManager(this.network);
        this.assets = new AssetManager(this.network);
        this.governance = new GovernanceManager(this.network);
    }

    // async getPersonas(account){
    //     const address = account.toAddress();
    //     const personas = await this.identities.listPersonas(address);
    //     return personas;
    // }

    createWallet(prop, options) {
        const wallet = new Wallet(prop, options);
        return wallet;
    }

    async init() {
        await this.network.init();
    }
}

export default Client;
