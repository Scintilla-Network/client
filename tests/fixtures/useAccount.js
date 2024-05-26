import {Wallet} from "@scintilla-network/wallet";



const phrases = [
    'glory priority beyond route soda poet talent shift clinic moment pioneer wait hint giggle push strategy explain call bench nuclear cause assist property orbit',
    'general dentist ozone pet comfort dwarf road desert purpose clerk armor close harvest grief marriage unfair whip kitten hello crater pioneer glimpse melody kind',
    'rubber execute hello immune tell imitate vault grow inflict buyer creek fat tourist goose already when pupil clock now wedding cream fancy demand mass',
];

const useAccount = (index) => {
    console.log(Wallet.prototype.name);
    const phrase = phrases[index];
    const wallet = Wallet.create(phrase);
    const account = wallet.getAccount(0);
    return account;
}


export default useAccount;
