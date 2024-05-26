import calculateExcessivesBytes from "./calculateExcessivesBytes.js";
import parseCost from "./parseCost.js";

export default function verifyEnoughFees(bankingLedger, referenceCluster, stateAction){
    const bankingLedgerFullMoniker = bankingLedger.getFullMoniker();

    const referenceClusterFullMoniker = referenceCluster.getFullMoniker();
    const selfRecord = referenceCluster.records?.clusters?.[referenceClusterFullMoniker];


    const stateActionKind = stateAction.kind;
    const stateActionCluster = stateAction.cluster;
    const stateActionType = stateAction.type;
    const stateActionAction = stateAction.action;

    if(stateActionCluster !== referenceClusterFullMoniker){
        return {
            isAuthorized: false,
            error: 'Cluster is not the same as the referenceCluster'
        };
    }

    const excessBytes = calculateExcessivesBytes(stateAction);
    console.log({excessBytes})

    switch (stateActionKind){
        case 'TRANSFER':
            const transferRules = selfRecord.rules?.fees?.transfer;
            const parsedCost = parseCost(transferRules.cost);

            let stateActionCost = parsedCost.amount.multiply(excessBytes);
            if(!stateActionCost.equals('0.0')){
                // check if the user has enough funds in fees
                const userFees = referenceCluster.records?.identities?.[referenceClusterFullMoniker]?.fees;
                console.log({userFees}) // TODO: check if the user has enough funds
            }
            console.log({transferRules, stateActionCost})
            break;
        case 'TRANSACTION':
            break;
        case 'TRANSITION':
            const cost = '0.01';
            // Should be quadratic of excess bytes
            //  it('should calculate a really excessive amount of data to ensure quadratic price', () => {
            //
            //     });
            const transitionFeeCost = cost * excessBytes * excessBytes;
            break;
        default:
            return {
                isAuthorized: false,
                error: 'Unknown stateActionKind'
            };
    }

    // const costPerMB = selfRecord.

    console.log(selfRecord)

    // If the cluster is the bankingLedger, then we check the fees
    if(referenceClusterFullMoniker === bankingLedgerFullMoniker){



    }



    // Transfer are free as long as they don't contains crap in it (depends on the core.banking cluster rules).

    // Transaction fees are calculated.
    // Transitions is more specifics (clusters have their own rules, and we exclude some clusters from fees)





    // Fastest way to answer:

    console.log(stateAction)

    return {
        isAuthorized: false,
        error: null
    };
}
