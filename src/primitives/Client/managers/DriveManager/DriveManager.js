import {DriveData, Transition} from "@scintilla-network/sdk";
import {Buffer} from "buffer";

class DriveManager {
    constructor(network) {
        this.network = network;
    }

    selectDrivePeers() {
        const peers = Object.values(this.network.peers);
        const drivePeers = peers.filter(peer => peer.services.drive.rest);
        return drivePeers;
    }
    createItem() {
        const driveData = new DriveData({
            type:'text',
            content: 'Hello World'
        });

       return driveData;
   }

    async registerItem(driveData,account) {
        const transition = new Transition({
            cluster: 'core.drive',
            type: 'DATA',
            action: 'CREATE',
            data: driveData.toHex(),
            sender: account.moniker
        });

        const signature = await account.sign(transition);
        transition._signature = signature;
        if(!transition._publicKey) {
            transition._publicKey = Buffer.from(account.key.getPublicKey()).toString('hex')
        }

        if(!account.verify(transition)) {
            throw new Error('Invalid signature');
        }

        const randomPeer = this.selectDrivePeers();

        const response = await fetch(`http://${randomPeer[0].services.drive.rest.hostname}:${randomPeer[0].services.drive.rest.port}/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transition.toJSON()),
        });

        const data = await response.json();
        return data;
    }

    async getItem(hash) {
        const data = await this.network.fetchFromRandomPeer('drive',`data/${hash}`);

        // const drivePeers = this.selectDrivePeers();
        // const response = await fetch(`http://${drivePeers[0].services.drive.rest.hostname}:${drivePeers[0].services.drive.rest.port}/data/${hash}`);
        // const data = await response.json();
        // return new DriveData(data);
        return data;
    }

    async listItems() {
        const drivePeers = this.selectDrivePeers();
        const response = await fetch(`http://${drivePeers[0].services.drive.rest.hostname}:${drivePeers[0].services.drive.rest.port}/data`);
        const data = await response.json();
        return data;
    }

    async getLatestBlock() {
        const drivePeers = this.selectDrivePeers();
        const url = `http://${drivePeers[0].services.drive.rest.hostname}:${drivePeers[0].services.drive.rest.port}/block/last`;
        console.log(url);
        const response = await fetch(`http://${drivePeers[0].services.drive.rest.hostname}:${drivePeers[0].services.drive.rest.port}/block/last`);
        const data = await response.json();
        return data;
    }

    async listDocuments(query){
        const data = await this.network.fetchFromRandomPeer('drive',`data`);
        const documents = [];

        let listItems = data;
        if(query?.owner){
            listItems = data.filter((item)=> item.includes(`.${query.owner}`))
        }

        for(const item of listItems){
            const document = await this.getItem(item);
            documents.push({hash:item,document});
        }
        return documents;
    }
}

export default DriveManager;
