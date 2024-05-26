# client

Scintilla's Client - Provide Wallet, Signer and API for interfacing with Scintilla


## Usage

### Create a wallet from a phrase

```js
import { Client } from "@scintilla-network/client";

// Create a wallet from a phrase
const phrase = 'test test test test test test test test test test test junk';
const client = new Client();
const wallet = client.createWallet(phrase);
```

### Create a persona from a wallet

```js
const account = wallet.getAccount();
const persona = account.getPersona('sct.test');
```

### Sign a message with a persona (identity)

```js
const persona = account.getPersona('sct.test');
const signer = persona.getSigner();
const address = signer.toAddress();

// Will sign the message with the identity `sct.test` making it verifiable on chain
const message = 'Hello, world!';
const signable = new keys.SignableMessage(message, address);
const [signature, publicKey] = signable.sign(signer);
const verified = signable.verify(signature, publicKey);
console.log(verified); // true
```

## Helpers exports

The following exports are available purely for convenience (as they are dependencies of the client):

- `mnemonic` - The mnemonic module (@scintilla-network/mnemonic)
  - `Mnemonic` - The Mnemonic class
  - `mnemonicToSeedSync` - The mnemonicToSeedSync function
  - `mnemonicToSeed` - The mnemonicToSeed function
  - `mnemonicToEntropy` - The mnemonicToEntropy function
  - `entropyToMnemonic` - The entropyToMnemonic function
  - `generateMnemonic` - The generateMnemonic function
  - `validateMnemonic` - The validateMnemonic function
  - `setDefaultWordlist` - The setDefaultWordlist function
  - `getDefaultWordlist` - The getDefaultWordlist function
  - `wordlists` - The wordlists object

- `keys` - The keys module (@scintilla-network/keys)
  - `Signer` - The Signer class
  - `SignableMessage` - The SignableMessage class
  - `AccountKeyring` - The AccountKeyring class
  - `AddressKeyring` - The AddressKeyring class
  - `ChainKeyring` - The ChainKeyring class
  - `PersonaKeyring` - The PersonaKeyring class
  - `SharedPersonaKeyring` - The SharedPersonaKeyring class
  - `Keyring` - The Keyring class
  - `PrivateKey` - The PrivateKey class
  - `PublicKey` - The PublicKey class
  - `Address` - The Address class
  - `ChainCode` - The ChainCode class
  - `ExtendedKey` - The ExtendedKey class
  - `ExtendedPrivateKey` - The ExtendedPrivateKey class
  - `ExtendedPublicKey` - The ExtendedPublicKey class
  - `utils` - The utils object

- `sdk` - The sdk module (@scintilla-network/sdk)
  - `Asset` - The Asset class
  - `ChainBlock` - The ChainBlock class
  - `ChainBlockHeader` - The ChainBlockHeader class
  - `ChainBlockPayload` - The ChainBlockPayload class
  - `ClusterBlock` - The ClusterBlock class
  - `DriveData` - The DriveData class
  - `FIFOLookupMap` - The FIFOLookupMap class
  - `GovernanceProposal` - The GovernanceProposal class
  - `GovernanceVote` - The GovernanceVote class
  - `HashProof` - The HashProof class
  - `Identity` - The Identity class
  - `NET_KINDS` - Network kinds constants
  - `NetMessage` - The NetMessage class
  - `PeerInfoMessage` - The PeerInfoMessage class
  - `Queue` - The Queue class
  - `RelayBlock` - The RelayBlock class
  - `RelayBlockHeader` - The RelayBlockHeader class
  - `RelayBlockPayload` - The RelayBlockPayload class
  - `TimeQueue` - The TimeQueue class
  - `Transaction` - The Transaction class
  - `Transfer` - The Transfer class
  - `Transition` - The Transition class
  - `Voucher` - The Voucher class
  - `base64ToHex` - Convert base64 to hex
  - `bech32` - Bech32 encoding/decoding
  - `escapeHTML` - Escape HTML special characters
  - `exportDoc` - Export document
  - `getTargetHash` - Get target hash
  - `hash` - Hash function
  - `importDoc` - Import document
  - `jsonStringify` - JSON stringify
  - `makeADR36Doc` - Make ADR-36 document
  - `makeDoc` - Make document
  - `messages` - Message constants
  - `sha256` - SHA256 hash function
  - `signDoc` - Sign document
  - `sortObjectByKey` - Sort object by key
  - `sortedJsonByKeyStringify` - Stringify sorted JSON
  - `stringifiedJsonBufferize` - Convert stringified JSON to buffer
  - `uInt8ArrayToHex` - Convert Uint8Array to hex
  - `uint8ArrayToBase64` - Convert Uint8Array to base64
  - `unescapeHTML` - Unescape HTML special characters
  - `varint` - Variable integer encoding/decoding
  - `verifyDoc` - Verify document
  - `wait` - Wait utility function

- `wallet` - The wallet module (@scintilla-network/wallet)
  - `Account` - The Account class
  - `Wallet` - The Wallet class
  - `utils` - The utils object
    - `deterministicMonikerUUID` - The deterministicMonikerUUID function