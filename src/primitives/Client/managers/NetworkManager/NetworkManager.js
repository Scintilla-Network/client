import fetchSeed from "./methods/fetchSeed.js";
import {Peer} from "@scintilla-network/sdk";

class NetworkManager {
    constructor({chainId}) {
        this.seeds = ['https://seeds.scintilla.network'];

        this.peers = {};
        this.mesh = {};

        this.chainId = chainId;

        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) {
            console.error('NetworkManager already initialized.');
            return;
        }
        const seeds = await this.fetchSeed();
        // Using the seed, start building out the meshgraph
        for (let i = 0; i < seeds.length; i++) {
            const seed = seeds[i];
            const peer = new Peer(seed);
            this.peers[peer.id] = peer;
        }

        console.log(`NetworkManager initialized with ${this.peers.length} peers from ${this.seeds.length} seeds.`)
        await this.synchronizeCoordinators();
        this.isInitialized = true;
    }

    async synchronizeCoordinators() {
        const peers = Object.values(this.peers);
        const promises = peers.map(async peer => {
            if (peer.type === 'coordinator' || peer.type === 'seed') {
                await peer.synchronize();
                return Promise.resolve({peer, data: peer.data});
            } else {
                return Promise.resolve({peer, data: null});
            }
        });

        const responses = await Promise.allSettled(promises);
        responses.forEach(response => {
            if (response.status === 'fulfilled') {
                const {value} = response;
                const {peer, data} = value;
                this.mesh[peer.id] = data;
            }
        });

        console.log('Mesh', this.mesh);
        console.log('Peers', this.peers);

    }

    selectRandomPeer() {
        if (!this.isInitialized) {
            console.error('NetworkManager not initialized.');
            return;
        }
        const peers = Object.values(this.peers);
        const randomPeer = peers[Math.floor(Math.random() * peers.length)];
        return randomPeer;
    }

    async fetchFromRandomPeer(cluster, pathname, props) {
        if (!this.isInitialized) {
            console.warn('NetworkManager not initialized. Initializing now.');
            await this.init();
        }
        const randomPeer = this.selectRandomPeer();
        console.log({randomPeer});
        console.log({cluster}, {services: randomPeer.services});
        if (!randomPeer || !randomPeer.services[cluster].rest) {
            throw new Error(`No peer available with the requested cluster: ${cluster}`);
        }
        try {
            const url = `http://${randomPeer.services[cluster].rest.hostname}:${randomPeer.services[cluster].rest.port}/${pathname}`;
            const response = await fetch(url, props);
            const data = await response.json();
            return data;
        } catch (e) {
            if (e.code === undefined && e.message) {
                switch (e.message) {
                    case "Failed to fetch":
                        throw new Error('Failed to fetch to peer. Peer may be offline.');
                    default:
                        console.error(e);
                        throw new Error(e.message);
                }
            }
            console.error(e);
            throw new Error(e);
        }
    }
}

NetworkManager.prototype.fetchSeed = fetchSeed;
export default NetworkManager;
