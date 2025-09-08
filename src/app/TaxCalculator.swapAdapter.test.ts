import test from 'node:test';
import assert from 'node:assert/strict';

import { TaxCalculator } from './TaxCalculator.js';
import type { ForCalculatingTaxes } from '@/ports/drivingPorts/ForCalculatingTaxes.js';
import type { ForGettingTaxRates } from '@/ports/drivenPorts/ForGettingTaxRates.js';
import { InMemoryTaxRateRepository } from '@/drivenAdapters/InMemoryTaxRateRepository.js';

test("TaxCalculator works with a different driven adapter (19%)", () => {
    const repo: ForGettingTaxRates = new InMemoryTaxRateRepository(0.19)
    const calculator: ForCalculatingTaxes = new TaxCalculator(repo);
    assert.equal(calculator.taxOn(100), 19);
})