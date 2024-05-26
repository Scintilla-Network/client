export default function calculateExcessivesBytes(stateAction) {

    let excessBytes = 0;
    switch (stateAction.kind) {
        case "TRANSFER":
            const transferData = stateAction.data;
            // Remove asset, amount and recipient from the data object
            const excessData = Object.keys(transferData).reduce((acc, key) => {
                if (key !== 'asset' && key !== 'amount' && key !== 'recipient') {
                    acc[key] = transferData[key];
                }
                return acc;
            }, {});
            const serializedData = JSON.stringify(excessData);
            excessBytes += serializedData ? serializedData.length - 2 : 0;
            break;
        case "TRANSITION":
            const transitionData = stateAction.data;
            const serializedTransitionData = JSON.stringify(transitionData);
            excessBytes += serializedTransitionData ? serializedTransitionData.length - 2 : 0;
            break;
        case "TRANSACTION":
            const transactionData = stateAction.data;
            const serializedTransactionData = JSON.stringify(transactionData);
            excessBytes += serializedTransactionData ? serializedTransactionData.length - 2 : 0;
            break;
        default:
            break;
    }

    return excessBytes;
}
