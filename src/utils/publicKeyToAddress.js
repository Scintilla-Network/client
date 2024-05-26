import {ripemd160, sha256} from "@scintilla-network/hashes/classic";
import { uint8array, bech32 } from "@scintilla-network/keys/utils";
import isHexadecimal from "./isHexadecimal.js";

export default function publicKeyToAddress(publicKey, bech32Prefix = 'sct') {
    // Check pubkey as hex
    if(!publicKey){
        throw new Error('Public key is required');
    }

    const publicKeyIsHexadecimal = isHexadecimal(publicKey);

    let pubKeyBuffer;
    if(publicKey instanceof Uint8Array){
        pubKeyBuffer = publicKey;
    } else if(publicKeyIsHexadecimal) {
        pubKeyBuffer = uint8array.fromHex(publicKey);
    }else {
        throw new Error('Public key must be hexadecimal formatted or Uint8Array');
    }


    const pubKeyHash = ripemd160(sha256(pubKeyBuffer));

    return bech32.encode(bech32Prefix, bech32.toWords(pubKeyHash));
}
