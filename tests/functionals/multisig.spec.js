/**
 * Functional tests for multisig transactions/transfers/transitions
 * Sign and verify multisig transactions
 */

import {describe, it} from '@scintilla-network/litest';
import {Transfer, Transaction, Transition} from '@scintilla-network/sdk';
import {Account, Wallet} from "@scintilla-network/wallet";
import verifyIdentityAuthorized from "../../src/utils/verifyIdentityAuthorized.js";
import {Identity} from "@scintilla-network/sdk";


const phrases = [
    'glory priority beyond route soda poet talent shift clinic moment pioneer wait hint giggle push strategy explain call bench nuclear cause assist property orbit',
    'general dentist ozone pet comfort dwarf road desert purpose clerk armor close harvest grief marriage unfair whip kitten hello crater pioneer glimpse melody kind',
    'rubber execute hello immune tell imitate vault grow inflict buyer creek fat tourist goose already when pupil clock now wedding cream fancy demand mass',
];

const useAccount = (index) => {
    const phrase = phrases[index];
    const wallet = Wallet.create(phrase);
    const account = wallet.getAccount(0);
    return account;
}

const glorySigner = useAccount(0).getSigner('glory', 'persona.operator');
const generalSigner = useAccount(1).getSigner('general', 'persona.operator');
const rubberSigner = useAccount(2).getSigner('rubber', 'persona.operator');

// describe('Functional - Multisig', () => {
//     it('Sign multisig transactions', () => {

const identity = new Identity({
    parent: null,
    moniker: 'multi',
    records: {},
    members: [
        [glorySigner.toAddress(),1],
        [generalSigner.toAddress(),1],
        // ['rubber',1],
    ]
});

const transition = {
    "kind": "TRANSITION",
    "module": "core.identity",
    "action": "CREATE",
    "type": "IDENTITY",
    "data": identity.toJSON(),
    "timestamp": 1711547741625,
};
const ts = new Transition(transition);

await ts.sign(glorySigner);
// await ts.sign(generalSigner);
// await ts.sign(rubberSigner);
// console.log('Sign multisig transactions',ts);
// console.log(ts.validate())

const isAuth = await verifyIdentityAuthorized(identity, ts);
console.log('isAuth', isAuth);

describe('verifyIdentityAuthorized', () => {
    it('should verify identity authorized', () => {
        console.log('Verify identity authorized');
    });
});
// });
// });
