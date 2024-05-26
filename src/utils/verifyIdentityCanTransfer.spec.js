import {Transfer} from "@scintilla-network/sdk";
import useAccount from "../../tests/fixtures/useAccount.js";
import {describe, it} from '@scintilla-network/litest';

const glorySigner = useAccount(0).getSigner('glory', 'persona.operator');
const generalSigner = useAccount(1).getSigner('general', 'persona.operator');

const aliceTransfer = new Transfer({
    cluster: 'core.banking',
    action: 'EXECUTE',
    type: 'ASSET',
    data: {
        asset: 'sct',
        amount: 50,
        recipient: 'general',
    },
    timestamp: new Date().getTime(),
});


await aliceTransfer.sign(glorySigner);


// verifyIdentityCanTransfer(glorySigner, aliceTransfer);
describe('verifyIdentityCanTransfer', () => {
    it('should verify identity can transfer', () => {
        console.log('Verify identity can transfer');
    });
});
