import publicKeyToAddress from "./publicKeyToAddress.js";

/**
 * This helper function is used to verify if the identity authorized the child identity to be created.
 * @param {Identity} child identity - The child identity object
 * @param {StateAction} stateAction - The state action object
 *
 * @returns {boolean} - Returns true if the identity is authorized to perform the action, false otherwise
 *
 */
export default function verifyTLDIdentityAuthorized(identity, stateAction){
    // // Verify if state action contains a 100 SCT fee to 'core.identity'
    // const fees = stateAction.fees;
    // console.log(fees)

    const fullMoniker = identity.getFullMoniker();

    const selfRecord = identity.records?.clusters?.[fullMoniker];

    if(!selfRecord){
        return {
            isAuthorized: false,
            error: 'Cluster config not found in cluster identity records'
        };
    }

    const identityCreateAction = selfRecord.actions?.['IDENTITY.CREATE'];


    if(!identityCreateAction){
        return {
            isAuthorized: false,
            error: 'Cluster action not found in cluster identity records'
        };
    }

    const allowConditions = identityCreateAction.find(action => action.type === 'ALLOW');
    const allConditions = allowConditions.condition?.all;

    for(const conditions of allConditions){
        const {fact,operator, value, recipient} = conditions;

        // We only allow condition based on identity#fees
        if(fact !== 'identity#fees'){
            continue;
        }
    }

    return {
        isAuthorized: false,
        error: null
    };
}
