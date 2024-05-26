import {GovernanceVote, Transition, GovernanceProposal} from "@scintilla-network/sdk"

class GovernanceManager {
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

    createDAO(props) {
        if (!props) {
            throw new Error('Properties required');
        }
        return new DAO({
            moniker: props.moniker,
            rules: props.rules,
            records: props.records,
            members: props.members,
        });
    }

    createProposal(props) {
        if (!props) {
            throw new Error('Properties required');
        }
        return new GovernanceProposal(props);
    }

    createVote(props) {
        if (!props) {
            throw new Error('Properties required');
        }
        return new GovernanceVote(props);
    }


    async registerDAO(dao, account) {
        const transition = new Transition({
            cluster: 'core.identity',
            type: 'DAO',
            action: 'CREATE',
            data: dao.toJSON(),
            sender: account.toAddress(),
        });
        await transition.sign(account.signer);

        if (!transition.isValid()) {
            throw new Error('Invalid transition');
        }

        const randomPeer = this.selectIdentityPeer();
        const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/transition`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transition.toJSON({includePrivate: true}))
        });
        const data = await response.json();
        return data;
    }

    async registerProposal(proposal, persona, signer) {
        const transition = new Transition({
            cluster: 'core.identity',
            type: 'PROPOSAL',
            action: 'CREATE',
            data: proposal.toJSON(),
            sender: persona.moniker,
        });
        await transition.sign(signer);

        if (!transition.isValid()) {
            throw new Error('Invalid transition');
        }

        const data = await this.network.fetchFromRandomPeer('identity', 'transition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transition.toJSON({includePrivate: true}))
        });
        return data;
    }

    async registerVote(vote, persona, signer) {
        const transition = new Transition({
            cluster: 'core.identity',
            type: 'PROPOSAL_VOTE',
            action: 'CREATE',
            data: vote.toJSON(),
            sender: persona.moniker,
        });
        await transition.sign(signer);

        if (!transition.isValid()) {
            throw new Error('Invalid transition');
        }

        const data = await this.network.fetchFromRandomPeer('identity', 'transition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transition.toJSON({includePrivate: true}))
        });
        return data;
    }

    async getIdentity(moniker) {
        // const randomPeer = this.selectIdentityPeer();
        // const url = `http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/identity/${moniker}`;
        // console.log('url', url);
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/identity/${moniker}`);
        // const data = await response.json();
        // return data;
        const data = await this.network.fetchFromRandomPeer('identity', `identity/${moniker}`);
        return data;
    }

    async getDAO(moniker) {
        // const randomPeer = this.selectIdentityPeer();
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/governance/daos/${moniker}`);
        // const data = await response.json();
        // return data;
        const data = await this.network.fetchFromRandomPeer('identity', `governance/dao/${moniker}`);
        return data;
    }

    async listDAOs({moniker}) {
        // const randomPeer = this.selectIdentityPeer();
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/governance/daos`);
        // const data = await response.json();
        // return data;
        const pathname = (moniker) ? `governance/daos/${moniker}` : 'governance/daos';
        const data = await this.network.fetchFromRandomPeer('identity', pathname);
        return data;
    }

    async listProposals({dao}) {
        // const randomPeer = this.selectIdentityPeer();
        // const response = await fetch(`http://${randomPeer.services.identity.rest.hostname}:${randomPeer.services.identity.rest.port}/governance/proposals`);
        // const data = await response.json();
        // return data;
        const pathname = (dao) ? `governance/dao/${dao}/proposals` : 'governance/proposals';
        const data = await this.network.fetchFromRandomPeer('identity', pathname);
        return data;
    }

    async getDAOProposal(dao, proposal) {
        const data = await this.network.fetchFromRandomPeer('identity', `governance/dao/${dao}/proposal/${proposal}`);
        return data;
    }
}

export default GovernanceManager;
