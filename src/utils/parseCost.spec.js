import { describe, it, expect } from '@scintilla-network/litest';
import parseCost from "./parseCost.js";

describe('parseCost', () => {
    it('parses a integer cost', () => {
        const integerCost = parseCost('100sct');
        expect(integerCost).toEqual({
            amount: 100,
            symbol: 'sct',
        });
    })
    it('parses a float cost', () => {
        const floatCost = parseCost('100.5sct');
        expect(floatCost).toEqual({
            amount: 100.5,
            symbol: 'sct',
        });
    })

    it('parses a float cost', () => {
        const floatCost = parseCost('0.5sct');
        expect(floatCost).toEqual({
            amount: 0.5,
            symbol: 'sct',
        });
    })

    it('parses a float cost', () => {
        const floatCost = parseCost('0.0005sct');
        expect(floatCost).toEqual({
            amount: 0.0005,
            symbol: 'sct',
        });
    })

    it('parses a float cost', () => {
        const floatCost = parseCost('0.00000005sct');
        expect(floatCost).toEqual({
            amount: 0.00000005,
            symbol: 'sct',
        });
    })

    it('handles a missing symbol', () => {
        try {
            const floatCost = parseCost('0.00000005');
        } catch (e) {
            expect(e).toEqual(new Error(`Invalid cost: 0.00000005 (expected: <amount><symbol>)`));
        }
    });

    it('handles a missing amount', () => {
        try {
            const floatCost = parseCost('sct');
        } catch (e) {
            expect(e).toEqual(new Error(`Invalid cost: sct (expected: <amount><symbol>)`));
        }
    });

    it('handles any symbol', () => {
        const floatCost = parseCost('100.5sctech');
        expect(floatCost).toEqual({
            amount: 100.5,
            symbol: 'sctech',
        });

    });


});
