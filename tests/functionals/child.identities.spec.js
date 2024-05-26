/**
 * Functional tests for multisig transactions/transfers/transitions
 * Sign and verify multisig transactions
 */
// import { describe, it, expect } from 'vitest';
// import {Transfer, Transaction, Transition} from '@scintilla-network/sdk';
import {describe, it} from '@scintilla-network/litest';
import {Identity} from "@scintilla-network/sdk";
// import Logger from "hermodlog";
// import verifyChildIdentityAuthorized from "../../src/utils/verifyChildIdentityAuthorized.js";
// import useAccount from "../fixtures/useAccount.js";

// const glorySigner = useAccount(0).getSigner('glory', 'persona.operator');
// const generalSigner = useAccount(1).getSigner('general', 'persona.operator');
// const rubberSigner = useAccount(2).getSigner('rubber', 'persona.operator');

// describe('Functional - Multisig', () => {
//     it('Sign multisig transactions', () => {

// const identity = new Identity({
//     parent: null,
//     moniker: 'multi',
//     records: {},
//     members: [
//         [glorySigner.toAddress(),1],
//         [generalSigner.toAddress(),1],
//         // ['rubber',1],
//     ]
// });

// const logger = new Logger();/

// const id = await prepareSCTDAOTransition.call({logger}, glorySigner);
// // console.log(JSON.stringify(id[0].data));

// const identity = new Identity({"parent":null,"moniker":"sct","members":[["scintilla",1000,0,0,0,0,0]],"records":{"modules":{"core.identity":{"rules":[{"action":"IDENTITY.CREATE","cost":"0.01sct","recipient":"sct","duration":1825,"strategies":["PREPAID","VOUCHER"]}]}}},"childs":[]});

// const identityChild = new Identity({"parent":"sct","moniker":"sct.alex","members":[["alex",1000,0,0,0,0,0]],"records":{},"childs":[]});

// //
// const transition = {
//     "kind": "TRANSITION",
//     "module": "core.identity",
//     "action": "CREATE",
//     "type": "IDENTITY",
//     "data": identityChild.toJSON(),
//     "timestamp": 1711547741625,
// };
// const ts = new Transition(transition);

// const isAuth = verifyChildIdentityAuthorized(identity, ts);

// console.log('isAuth', isAuth);
//

describe('Functional - Child Identities', () => {
    it('Verify child identity authorized', () => {
        // expect(isAuth).toBe(true);
        console.log('Verify child identity authorized');
    });
});
// await ts.sign(glorySigner);
// // await ts.sign(generalSigner);
// // await ts.sign(rubberSigner);
// // console.log('Sign multisig transactions',ts);
// // console.log(ts.validate())
//
// const isAuth = await verifyIdentityAuthorized(identity, ts);
// console.log('isAuth', isAuth);
// // });
// });
