import test from "node:test";
import assert from "node:assert/strict";

import { HttpServer } from "./HttpServer.js";
import { TaxCalculator } from "@/app/TaxCalculator.js";
import { FixedTaxRateRepository } from "@/drivenAdapters/FixedTaxRateRepository.js";

test("POST /net returns amount plus tax", async( t ) => {
    const repo = new FixedTaxRateRepository(); // 15%
    const calc = new TaxCalculator(repo);
    const http = new HttpServer(calc);

    const server = http.listen(0)
    t.after(() => server.close());

    const addr = server.address();
    assert.ok( addr && typeof addr === "object" );
    const port = addr.port;

    const res = await fetch(`http://127.0.0.1:${port}/net`, {
        method: "POST",
        headers: { "content-type" : "application/json" },
        body: JSON.stringify({ amount: 100 })
    })
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.deepEqual(body, {net: 115})
})