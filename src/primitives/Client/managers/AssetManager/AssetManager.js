import {Asset, Transition, Transfer, Transaction} from "@scintilla-network/sdk";
// import Voucher from "@scintilla-network/banking-machines/src/Voucher/Voucher.js";
// import Voucher from "../../../../../../banking-machines/src/Voucher/Voucher.js";
import {Voucher} from '@scintilla-network/sdk';
class AssetManager {
    constructor(network) {
        this.network = network;
    }

    selectBankingPeers() {
        const peers = Object.values(this.network.peers);
        // select peers that has banking service
        const bankingPeers = peers.filter(peer => peer.services.banking.rest);
        return bankingPeers;
    }

    createAsset(props) {
        return new Asset(props);
    }

    async registerAsset(asset, persona, signer) {
        console.log('Registering asset', asset);
        const transition = new Transition({
            cluster: 'core.banking',
            type: 'ASSET',
            action: 'CREATE',
            data: asset.toJSON(),
            sender: persona.moniker,
        });

        await transition.sign(signer);

        if(!transition.isValid()) {
            throw new Error('Invalid transition');
        }

        const data = await this.network.fetchFromRandomPeer('banking','transition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transition.toJSON({includePrivate: true}))
        });
        return data;

    }


    async getAsset(symbol) {

        // const bankingPeers = this.selectBankingPeers();
        // const response = await fetch(`http://${bankingPeers[0].services.banking.rest.hostname}:${bankingPeers[0].services.banking.rest.port}/asset/${symbol}`);
        // const data = await response.json();
        // return data;
        const data = await this.network.fetchFromRandomPeer('banking',`asset/${symbol}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return data;
    }

    async listAssets({moniker, minter} = {}) {
    // const bankingPeers = this.selectBankingPeers();
        // const response = await fetch(`http://${bankingPeers[0].services.banking.rest.hostname}:${bankingPeers[0].services.banking.rest.port}/assets`);
        // const data = await response.json();
        // return data;

        let path = 'assets';
        if(moniker) {
            path = `assets/distribution/${moniker}`;
        }
        if(minter) {
            path = `assets/minter/${minter}`;
        }
        console.log('Fetching assets from', path);
        const data = await this.network.fetchFromRandomPeer('banking',path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data;
    }

    async getVoucher(voucherHash) {
        const data = await this.network.fetchFromRandomPeer('scintilla','voucher/' + voucherHash, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data;
    }
    async transfer(transfer, account) {
        // const transaction = new Transfer({
        //     cluster: 'core.banking',
        //     type: 'ASSET',
        //     data: transfer,
        //     sender: account.moniker,
        // });
        // await transfer.sign(account);
        const data = await this.network.fetchFromRandomPeer('scintilla','relay/transfer/' + transfer.toHex(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(transfer.toJSON())
        });
        return data;
    }

    async transferVoucher(transaction, account) {
        console.log('transaction', transaction);
        console.log('transaction.data', transaction.data);
        const voucher = new Voucher(transaction.data);
        console.log('voucher', voucher);
        await voucher.sign(account);
        const signedTransaction = new Transaction({
            cluster: 'core.banking',
            type: 'VOUCHER',
            action: 'TRANSFER',
            data: voucher.toJSON(),
            sender: account.moniker,
        });
        const data = await this.network.fetchFromRandomPeer('scintilla','relay/transaction/' + signedTransaction.toHex(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return data;
    }

}

export default AssetManager;
