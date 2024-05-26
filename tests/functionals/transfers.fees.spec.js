import {describe, it} from '@scintilla-network/litest';
import verifyEnoughFees from "../../src/utils/verifyEnoughFees.js";
import useAccount from "../fixtures/useAccount.js";
import {Identity, Transfer, Transition} from "@scintilla-network/sdk";

// verifyEnoughFees

const aliceSigner = useAccount(0).getSigner('alice', 'persona.operator');

//// if parent is sct, then free
//                             // if not, then fixed fee per bytes
//                             "OR": [
//                                 {
//                                     "type": "EQUAL",
//                                     "path": "data.asset",
//                                     "value": "sct"
//                                 },
//                                 {
//                                     "type": "GREATER_THAN",
//                                     "path": "fees",
//                                     "value": 0
//                                 }


// Totally free transfer
// But has a flat fee of 0.00000001sct per excess byte (other than asset, amount, recipient...)
const bankingFreeIdentity = new Identity({
    "parent": 'core',
    "moniker": 'banking',
    "members": [],
    "records": {
        "modules": {
            "core.banking": {
                "actions": {
                    'ASSET.EXECUTE': [{
                        "type": "ALLOW",
                        // We allow without any fees
                        "condition": {
                            "ALL": []
                        }
                    }]
                },
                "rules": {
                    "fees": {
                        "transfer": {
                            "cost": '0.00000001sct',
                            "recipient": "core.banking"
                        }
                    }
                }
            }
        }
    },
});


const aliceTransfer = new Transfer({
    module: 'core.banking',
    action: 'EXECUTE',
    type: 'ASSET',
    data: {
        asset: 'sct',
        amount: 50,
        recipient: 'alice',
    },
    timestamp: new Date().getTime(),
});


await aliceTransfer.sign(aliceSigner);


const isAuth = verifyEnoughFees(bankingFreeIdentity, bankingFreeIdentity, aliceTransfer);
console.log(isAuth);

describe('verifyEnoughFees', () => {
    it('should verify enough fees', () => {
        console.log('Verify enough fees');
    });
});