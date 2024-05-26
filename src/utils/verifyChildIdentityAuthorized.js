import publicKeyToAddress from "./publicKeyToAddress.js";

/**
 * This helper function is used to verify if the identity authorized the child identity to be created.
 * @param {Identity} parent identity - The parent identity object
 // * @param {Identity} child identity - The child identity object
 * @param {StateAction} stateAction - The state action object
 *
 * @returns {boolean} - Returns true if the identity is authorized to perform the action, false otherwise
 *
 */
export default function verifyChildIdentityAuthorized(parent, stateAction){
    const parentClusterRules = parent.records?.clusters?.['core.identity']?.rules;
    if(!parentClusterRules) return {error: 'No rules found for the parent identity', isAuthorized: false};

    // Has IDENTIFY.CREATE action
    const identityCreateRule = parentClusterRules.find(rule => rule.action === 'IDENTITY.CREATE');
    if(!identityCreateRule) return {error: 'No rule found for the action IDENTITY.CREATE', isAuthorized: false};

    // Check if the child respects the rules
    const { cost, recipient, duration, strategies } = identityCreateRule;

    const stateActionsFees = stateAction.fees;
    if(!stateActionsFees || stateActionsFees.length === 0) return {error: 'No fees found for the state action', isAuthorized: false};

    const hasFeeForRecipient = stateActionsFees.find(fee => fee.recipient === recipient);
    if(!hasFeeForRecipient) return {error: 'No fee found for the recipient', isAuthorized: false};

    const hasCost = hasFeeForRecipient.amount >= cost;
    if(!hasCost) return {error: 'Cost is higher than the fee', isAuthorized: false};

    // Check if the strategies are respected
    const hasPrepaidStrategy = strategies.includes('PREPAID');
    const hasVoucherStrategy = strategies.includes('VOUCHER');

    // We only support prepaid strategy for now
    if(!hasPrepaidStrategy) return {error: 'PREPAID strategy is required', isAuthorized: false};


    // TODO: Add VOUCHER and FEE support
    return true;
}
