import {Identity, Transition} from "@scintilla-network/sdk"
class IdentityManager {
    constructor(network) {
        this.network = network;
    }

    selectIdentityPeer() {
        const peers = Object.values(this.network.peers);
        // select peers that has identity service
        const identityPeers = peers.filter(peer => peer.services.identity.rest);
        const randomPeer = identityPeers[Math.floor(Math.random() * identityPeers.length)];
        return randomPeer;
    }

    createIdentity(props) {
        return new Identity(props);
    }

    async registerIdentity(identity, account) {
        const transition = new Transition({
            cluster: 'core.identity',
            type: 'IDENTITY',
            action: 'CREATE',
            timestamp: Date.now(),
            data: identity.toJSON(),
            // sender: account.toAddress(),
        });

        await transition.sign(account.signer);

        if(!transition.isValid()) {
            throw new Error('Invalid transition');
        }

        // const randomPeer = this.selectIdentityPeer();
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/transition`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(transition.toJSON({includePrivate: true}))
        // });
        // const data = await response.json();
        // return data;

        // FIXME: WTF includePrivate ????

        // const request = await this.network.fetchFromRandomPeer('identity','relay/transition', {
        const response = await this.network.fetchFromRandomPeer('scintilla','relay/transition/'+transition.toHex(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'text/plain'
                // 'Content-Type': 'text/plain;charset=UTF-8'
            },

        });
        return response;



        // const signature = await account.sign(transition);
        // transition._signature = signature;
        // if(!transition._publicKey) {
        //     transition._publicKey = Buffer.from(account.key.getPublicKey()).toString('hex')
        // }
        //
        //
        // if(!account.verify(transition)) {
        //     throw new Error('Invalid signature');
        // }
        //
        // const randomPeer = this.selectIdentityPeer();
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/transition`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(transition.toJSON({includePrivate: true}))
        // });
        // const data = await response.json();
        // return data;
    }

    async getIdentity(moniker) {
        // const randomPeer = this.selectIdentityPeer();
        // const url = `http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/identity/${moniker}`;
        // console.log('url', url);
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/identity/${moniker}`);
        // const data = await response.json();
        // return data;
        // const identity = await this.network.fetchFromRandomPeer('identity',`identity/${moniker}`);
        const identity = await this.network.fetchFromRandomPeer('scintilla',`identity/${moniker}`);
        return identity;
    }

    async listIdentities() {
        // const randomPeer = this.selectIdentityPeer();
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/identities`);
        // const data = await response.json();
        // return data;
        const identities = await this.network.fetchFromRandomPeer('identity','identities');
        return identities;
    }

    async listProposals() {
        // const randomPeer = this.selectIdentityPeer();
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/proposals`);
        // const data = await response.json();
        // return data;
        const proposals = await this.network.fetchFromRandomPeer('identity','proposals');
        return proposals;
    }
    async listBlocks() {
        // const randomPeer = this.selectIdentityPeer();
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/blocks`);
        // const data = await response.json();
        // return data;
        const blocks = await this.network.fetchFromRandomPeer('identity','blocks');
        return blocks;
    }

    async getProof(proofHash){
        // const randomPeer = this.selectIdentityPeer();
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/proofs/${proofHash}`);
        // const data = await response.json();
        // return data;

        const proof = await this.network.fetchFromRandomPeer('identity',`proofs/${proofHash}`);
        return proof;
    }

    // TODO: by address or query?
    async listPersonas(address){
        // const randomPeer = this.selectIdentityPeer();
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/personas/${address}`);
        // const data = await response.json();
        // return data;
        const personas = await this.network.fetchFromRandomPeer('identity',`personas/${address}`);
        return personas;
    }

    async getPersona(moniker){
        const identity = await this.network.fetchFromRandomPeer('identity',`identity/${moniker}`);

        const persona = {
            moniker: identity.moniker,
            address: identity.address,
            records: identity.records
        }

        return persona;
    }
}

export default IdentityManager;
