import { FixedTaxRateRepository } from "@/drivenAdapters/FixedTaxRateRepository.js";
import { TaxCalculator } from '@/app/TaxCalculator.js';
import { ForGettingTaxRates } from '@/ports/drivenPorts/ForGettingTaxRates.js';
import { ForCalculatingTaxes } from '@/ports/drivingPorts/ForCalculatingTaxes.js';


const taxRateRepository: ForGettingTaxRates = new FixedTaxRateRepository();
const myCalculator: ForCalculatingTaxes = new TaxCalculator(taxRateRepository);

const amount = 100;
console.log(`Tax on ${amount} = ${myCalculator.taxOn(amount)}`);