import {describe, it} from '@scintilla-network/litest';
import {Transfer, Transaction, Transition} from '@scintilla-network/sdk';
import calculateSupply from "./calculateSupply.js";


describe('calculateSupply', () => {
    // it('should calculate the supply of an asset', () => {
    //     const supply0 = calculateSupply();
    //     const supplyBlk0 = calculateSupply({block:0});
    //     const supplyEpoch0 = calculateSupply({epoch:0});
    //
    //     expect(supply0.currentSupply).toBe(3000000);
    //     expect(supplyBlk0.currentSupply).toBe(3000000);
    //     expect(supplyEpoch0.currentSupply).toBe(3000000);
    // });
    // it('should still calculates', () => {
    //     const supplyEpoch7 = calculateSupply({epoch: 7});
    //     expect(supplyEpoch7.currentSupply).toBe(3201358.2250986993);
    //
    //     const supplyEpoch14 = calculateSupply({epoch: 14});
    //     expect(supplyEpoch14.currentSupply).toBe(3402293.978300616);
    //
    //     const supplyEpoch30 = calculateSupply({epoch: 30});
    //     expect(supplyEpoch30.currentSupply).toBe(3859994.026612267);
    //
    //     const supplyEpoch60 = calculateSupply({epoch: 60});
    //     expect(supplyEpoch60.currentSupply).toBe(4712281.681671693);
    //
    //     const supplyEpoch365 = calculateSupply({epoch: 365});
    //     expect(supplyEpoch365.currentSupply).toBe(12955338.252335193);
    //
    //     const supplyEpoch3650 = calculateSupply({epoch: 3650});
    //     expect(supplyEpoch3650.currentSupply).toBe(66870306.53337262);
    //
    //     const supplyEpoch36500 = calculateSupply({epoch: 36500});
    //     expect(supplyEpoch36500.currentSupply).toBe(98969517.70294122);
    //
    //     const supplyEpoch46500 = calculateSupply({epoch: 46500});
    //     console.log(supplyEpoch46500);
    //     expect(supplyEpoch46500.currentSupply).toBe(98971116.28088884);
    //
    //     const supplyEpoch465000 = calculateSupply({epoch: 465000});
    //     console.log(supplyEpoch465000);
    //     expect(supplyEpoch465000.currentSupply).toBe(98971116.28088884);
    // });
    it('should still calculates', () => {
        // console.log(`1y: ${calculateSupply({epoch: 365}).currentSupply}`);
        // console.log(`5y: ${calculateSupply({epoch: 1325}).currentSupply}`);
        // console.log(`10y: ${calculateSupply({epoch: 3650}).currentSupply}`);
        // console.log(`20y: ${calculateSupply({epoch: 7300}).currentSupply}`);
        console.log('50y: ',calculateSupply({epoch: 18250}));
        console.log('100: ',calculateSupply({epoch: 36500}));
        console.log('1000: ',calculateSupply({epoch: 365000}));
        // console.log(`100y: ${JSON.stringify(calculateSupply({epoch: 36500}))}`);
        // console.log(`1000y: ${calculateSupply({epoch: 365000}).currentSupply}`);

    }, {timeout: 10000});
})
