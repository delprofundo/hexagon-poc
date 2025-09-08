import { ForGettingTaxRates } from '@/ports/drivenPorts/ForGettingTaxRates.js';

export class FixedTaxRateRepository implements ForGettingTaxRates {
    taxRate(_amount: number): number {
        return 0.15
    }
}