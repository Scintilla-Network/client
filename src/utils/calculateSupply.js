export default function calculateSupply(query = {block: 0}) {
    const reductionPerEpoch = 0.0003; // 0.03% reduction per epoch (1 epoch = 1 day = 1440 blocks)
    const blockTime = 60; // 1m per block

    const initialSupply = 2500000; // 2.5M tokens
    const initialReward = 20; // 20 tokens per block
    const initialPrice = 0.01; // $0.01 per token
    const floorReward = 0.001; // Between yr 50 and 100, the reward is floored to 0.001 as burn mechanism reduces supply

    if(query.epoch !== undefined && query.block === undefined) {
        query.block = query.epoch * 1440;
    }
    const supply = {
        startBlock: 0,
        currentSupply: initialSupply,
        currentReward: initialReward,
        currentPrice: initialPrice,
        currentMarketCap: initialSupply * initialPrice,
        endBlock: query.block,
    };

    for(let startBlock = supply.startBlock; startBlock < supply.endBlock; startBlock++) {


        if(startBlock % 1440 === 0) {
            const epoch = Math.floor(startBlock / 1440); // 1 day epochs
            // console.log('Epoch:', epoch);

            // Every epoch, the current reward is reduced by 1%
            supply.currentReward = (supply.currentReward - (supply.currentReward * reductionPerEpoch))
            supply.currentReward = parseFloat(supply.currentReward.toFixed(8));
            if(supply.currentReward < floorReward) {
                supply.currentReward = floorReward;
            }
            // console.log('Current reward:', supply.currentReward);

            // Assume
        }


        // The current supply is the sum of all rewards
        supply.currentSupply += supply.currentReward;
    }

    return supply;
}
