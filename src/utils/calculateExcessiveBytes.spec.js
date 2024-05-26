
import { describe, it, expect } from '@scintilla-network/litest';
import {Transfer, Transaction, Transition} from '@scintilla-network/sdk';
import calculateExcessivesBytes from "./calculateExcessivesBytes.js";



describe('calculateExcessiveBytes', () => {
    it('should calculate the excessive bytes of transfer', () => {

        const transfer = new Transfer({
            cluster: 'core.banking',
            action: 'EXECUTE',
            type: 'ASSET',
            data: {
                asset: 'sctech',
                amount: 1000,
                recipient: 'alice',
            },
            sender: 'thorstein',
            timestamp: new Date().getTime(),
        });
        const transfer2 = new Transfer({
            cluster: 'core.banking',
            action: 'EXECUTE',
            type: 'ASSET',
            data: {
                asset: 'sctech',
                amount: 1000,
                recipient: 'alice',
                clearlyNotNeeded: 'this is a test',
            },
            sender: 'thorstein',
            timestamp: new Date().getTime(),
        });
        const excessiveBytes = calculateExcessivesBytes(transfer);
        expect(excessiveBytes).toBe(0);

        const excessiveBytes2 = calculateExcessivesBytes(transfer2);
        expect(excessiveBytes2).toBe(35);
    });

    it('should calculate the excessive amount of TRANSITION', () => {
        const transition = new Transition({
            cluster: 'core.banking',
            action: 'CREATE',
            type: 'ASSET',
            data: {
                symbol: 'sctech',
                name: 'Scintilla Tech',
                supply: 1000000,
                decimals: 8,
            },
            sender: 'thorstein',
        });
        const excessiveBytes = calculateExcessivesBytes(transition);
        expect(excessiveBytes).toBe(71);

        const transition2 = new Transition({
            cluster: 'core.banking',
            action: 'CREATE',
            type: 'ASSET',
            data: {
                symbol: 'sctech',
                name: 'Scintilla Tech',
                supply: 1000000,
                decimals: 8,
                clearlyNotNeeded: 'this is a test',
            },
            sender: 'thorstein',
        });
        const excessiveBytes2 = calculateExcessivesBytes(transition2);
        expect(excessiveBytes2).toBe(107);
    });

    it('should calculate the excessive amount of TRANSACTION', () => {
      const transaction = new Transaction({
          cluster: 'core.banking',
          action: 'MINT',
          type: 'ASSET',
          data: {
              asset: 'sctech',
              amount: 1000,
              recipient: 'alice',
          },
          sender: 'thorstein',
          timestamp: new Date().getTime(),
      });

        const excessiveBytes = calculateExcessivesBytes(transaction);
        expect(excessiveBytes).toBe(50);

    });



})
