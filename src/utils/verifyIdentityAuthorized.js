import publicKeyToAddress from "./publicKeyToAddress.js";

/**
 * This helper function is used to verify if the identity is authorized to perform the action
 * @param {Identity} identity - The identity object
 * @param {StateAction} stateAction - The state action object
 *
 * @returns {boolean} - Returns true if the identity is authorized to perform the action, false otherwise
 *
 * We verify if the identity is authorized to perform the action by checking if the signers has the required permissions to perform the action.
 * Which is defined in the stateAction object to be signed by the 2/3 of the members of the quorum (when > 3 members, 1/2 when 2 members).
 */
export default function verifyIdentityAuthorized(identity, stateAction){
    console.log('identity:', identity);
    const identityMembers = identity.members;
    const stateActionAuthorizations = stateAction.authorizations;

    const stateActionKind = stateAction.kind;
    // Transition is for owner only
    // Transfer is for owner or spend only
    // Transaction is for owner or operator only

    // We count the total needed permissions
    const totalPossiblePermissions = identityMembers.reduce((acc, member) => {
        const [, ownerWeight, spendWeight, stakeWeight, proposeWeight, voteWeight, operateWeight] = member;
        switch (stateActionKind) {
            case 'TRANSITION':
                return acc + ownerWeight;
            case 'TRANSFER':
                return acc + ownerWeight + spendWeight;
            case 'TRANSACTION':
                return acc + ownerWeight + operateWeight;
            default:
                return acc;
        }
    },0);

    // 2/3 of the members of the quorum (when > 3 members, 1/2 when 2 members)
    let totalNeededPermissions = Math.ceil(totalPossiblePermissions * 2 / 3);
    if(identityMembers.length === 2){
        totalNeededPermissions = Math.ceil(totalPossiblePermissions / 2);
    }

    let totalAuthorizedPermissions = 0;

    for (let i = 0; i < stateActionAuthorizations.length; i++) {
        const authorization = stateActionAuthorizations[i];
        const authorizationMoniker = authorization.moniker;
        const authorizationPublicKey = authorization.publicKey;
        // const authorizationSignature = authorization.signature;

        // identity members is array of arrays
        // First element is either a moniker or an address (computed from the public key)
        let member = identityMembers.find(member => member[0] === authorizationMoniker);
        if(!member){
            // May be the moniker is the address
            const expectedAddress = publicKeyToAddress(authorizationPublicKey);
            member = identityMembers.find(member => member[0] === expectedAddress);
            if(!member){
                console.error(`Moniker not found in identity members: ${authorizationMoniker}`);
                return false;
            }
        }

        const [, ownerWeight, spendWeight, stakeWeight, proposeWeight, voteWeight, operateWeight] = member;

        switch (stateActionKind) {
            case 'TRANSITION':
                totalAuthorizedPermissions += ownerWeight;
                break;
            case 'TRANSFER':
                totalAuthorizedPermissions += ownerWeight + spendWeight;
                break;
            case 'TRANSACTION':
                totalAuthorizedPermissions += ownerWeight + operateWeight;
                break;
            default:
                break;
        }
    }
    return totalAuthorizedPermissions >= totalNeededPermissions;

}
