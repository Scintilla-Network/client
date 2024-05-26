import {describe, it} from '@scintilla-network/litest';
import verifyTLDIdentityAuthorized from "../../src/utils/verifyTLDIdentityAuthorized.js";
import {Identity, Transition} from "@scintilla-network/sdk";
import useAccount from "../fixtures/useAccount.js";

// verifyTLDIdentityAuthorized
const glorySigner = useAccount(0).getSigner('glory', 'persona.operator');

const moduleIdentity = new Identity({
    "parent": 'core',
    "moniker": 'identity',
    "members": [],
    "records": {
        "modules": {
            "core.identity": {
                "actions": {
                    'IDENTITY.CREATE': [{
                        "type": "ALLOW",
                        "condition": {
                            "all": [{
                                "fact": "identity#fees",
                                "operator": "equal",
                                "value": '1000sct',
                                "recipient": "scintilla"
                            }]
                        }
                    }]
                },
            }
        }
    },
});

const identity = new Identity({
    parent: null,
    moniker: 'tld',
    records: {},
    members: []
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

const isAuth = verifyTLDIdentityAuthorized(moduleIdentity, identity);
console.log(isAuth);


describe('verifyTLDIdentityAuthorized', () => {
    it('should verify TLD identity authorized', () => {
        console.log('Verify TLD identity authorized');
    });
});