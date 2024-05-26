// Parse 0.0000001sct to {amount: 1, symbol: 'sct'} or 100000.123abc to {amount: 100000.123, symbol: 'abc'}
import {BigDecimal} from "@scintilla-network/sdk";

export default function parseCost(cost) {
    
    const match = cost.match(/^(\d+(\.\d+)?)([a-z]+)$/);
    if (!match) {
        throw new Error(`Invalid cost: ${cost} (expected: <amount><symbol>)`);
    }

    return {
        // Without exponentiation
        amount: new BigDecimal(match[1])?.toNumber(),
        symbol: match[3],
    };
}
