import test from "node:test";
import assert from "node:assert/strict";
import { TaxCalculator } from "./TaxCalculator.js";
import type { ForGettingTaxRates } from "@/ports/drivenPorts/ForGettingTaxRates.js";
import type { ForCalculatingTaxes} from "@/ports/drivingPorts/ForCalculatingTaxes.js";

class RecordingRateRepo implements ForGettingTaxRates{
    public calledWith: number[] = [];
    constructor(private readonly rate: number){}
    taxRate(amount: number): number {
        this.calledWith.push(amount);
        return this.rate;
    }
}

test("TaxCalculator calls the driven port with the same amount and applies the rate", () => {
    const repo = new RecordingRateRepo(0.19);
    const calculator: ForCalculatingTaxes = new TaxCalculator(repo);
    const tax = calculator.taxOn( 100 );

    assert.equal(tax, 19);
    assert.deepEqual(repo.calledWith, [ 100 ]);
})