import type { ForGettingTaxRates } from "@/ports/drivenPorts/ForGettingTaxRates.js"

export class InMemoryTaxRateRepository implements ForGettingTaxRates {
    constructor( private readonly rate: number){}
    taxRate(_amount: number): number {
        return this.rate;
    }
}