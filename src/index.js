// import { Signer, SignableMessage } from '@scintilla-network/keys';

// export {default as Wallet} from './primitives/Wallet/Wallet.js';
// export {default as BigDecimal} from './primitives/BigDecimal/BigDecimal.js';
// export {default as Account} from './primitives/Account/Account.js';
// export {default as Peer} from './primitives/Peer/Peer.js';


// Exports for avoiding users to have to install @scintilla-network/mnemonic
import {Mnemonic, mnemonicToSeedSync, mnemonicToSeed, mnemonicToEntropy, entropyToMnemonic, generateMnemonic, validateMnemonic, setDefaultWordlist, getDefaultWordlist, wordlists } from '@scintilla-network/mnemonic';

// Exports for avoiding users to have to install @scintilla-network/keys
import {Signer, SignableMessage, AccountKeyring, AddressKeyring, ChainKeyring, PersonaKeyring, SharedPersonaKeyring, Keyring, PrivateKey, PublicKey, Address, ChainCode, ExtendedKey, ExtendedPrivateKey, ExtendedPublicKey, utils} from '@scintilla-network/keys';

import * as sdk from '@scintilla-network/sdk';
import * as mnemonic from '@scintilla-network/mnemonic';
import * as keys from '@scintilla-network/keys';
import * as wallet from '@scintilla-network/wallet';

export {default as Client} from './primitives/Client/Client.js';



// const mnemonic = {
//     Mnemonic,
//     mnemonicToSeedSync,
//     mnemonicToSeed,
//     mnemonicToEntropy,
//     entropyToMnemonic,
//     generateMnemonic,
//     validateMnemonic,
//     setDefaultWordlist,
//     getDefaultWordlist,
//     wordlists,
// }

// const keys = {
//     Signer,
//     SignableMessage,
//     AccountKeyring,
//     AddressKeyring,
//     ChainKeyring,
//     PersonaKeyring,
//     SharedPersonaKeyring,
//     Keyring,
//     PrivateKey,
//     PublicKey,
//     Address,
//     ChainCode,
//     ExtendedKey,
//     ExtendedPrivateKey, 
//     ExtendedPublicKey,
//     utils,
// }


export { mnemonic, keys, sdk, wallet };