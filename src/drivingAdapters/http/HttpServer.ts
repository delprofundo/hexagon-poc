import express, { Request, Response } from "express";
import type { ForCalculatingTaxes } from '@/ports/drivingPorts/ForCalculatingTaxes.js';

export class HttpServer {
    private readonly app = express();
    private readonly service: ForCalculatingTaxes;

    constructor( service: ForCalculatingTaxes ) {
        this.service = service;
        this.app.use(express.json());

        this.app.post('/taxes', (req: Request<any>, res: Response) => {
            const { amount } = req.body;
            const n = Number( amount );
            if(!Number.isFinite(n)){
                res.status(400).json({ error: "Invalid amount, must be number" });
                return;
            }
            const tax = this.service.taxOn( n );
            res.status( 200 ).json({ tax })
        })
        this.app.post( '/net', (req: Request, res: Response) => {
            const { amount } = req.body ?? {};
            const n = Number( amount );
            if(!Number.isFinite(n)){
                res.status(400).json({ error: "Invalid amount, must be number" });
                return;
            }
            const tax = this.service.taxOn( n );
            const net = n + tax;
            res.status( 200 ).json({ net })
        })
    }
    listen( port: number ) {
        return this.app.listen( port );
    }
}