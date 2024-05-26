import { bech32 } from "@scintilla-network/sdk";
import { sha256, ripemd160 } from "@scintilla-network/hashes/classic";
// import { secp256k1 } from "@scintilla-network/signatures/classic";

export default function makeADR36Doc(message, publicKey){
    if(!publicKey){
        throw new Error('Public key is required for ADR36.');
    }
    let data = message;
    if(message?.toHex) {
        data = message.toHex();
    }
    if(typeof data !== 'string'){
        data = Buffer.from(data).toString('base64');
    }

    const pubKeyBuffer = Buffer.from(publicKey, 'hex');
    const address = bech32.encode('sct', bech32.toWords(ripemd160(sha256(pubKeyBuffer))));

    return {
        "chain_id": "",
        "account_number": "0",
        "sequence": "0",
        "fee": {
            "gas": "0",
            "amount": []
        },
        "msgs": [
            {
                "type": "sign/MsgSignData",
                "value": {
                    "signer": address,
                    "data":data,
                }
            }
        ],
        "memo": ""
    };
}
