import { ForCalculatingTaxes } from '@/ports/drivingPorts/ForCalculatingTaxes.js';
import { ForGettingTaxRates } from '@/ports/drivenPorts/ForGettingTaxRates.js';

export class TaxCalculator implements ForCalculatingTaxes {
    private readonly taxRateRepository: ForGettingTaxRates;

    constructor( taxRateRepository: ForGettingTaxRates ) {
        this.taxRateRepository = taxRateRepository;
    }

    taxOn(amount: number): number {
        return amount * this.taxRateRepository.taxRate(amount);
    }
}