import express, { Request, Response } from 'express';
import crypto from './crypto';

const server = express();

server.use(express.json());

server.post('/keys/create', async (req: Request, res: Response) => {
    try {
        const cryptoPair = await crypto.generateKeyPair(2048);
        res.json(cryptoPair);
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
});

interface EncryptRequest extends Request {
    body: {
        publicKey: string
        message: string
    }
}

server.post('/message/encrypt', async (req: EncryptRequest, res: Response) => {
    const { publicKey, message } = req.body;

    if (!publicKey || !message) {
        res.status(400).json({ error: '"publicKey" and "message" are required' }).end();
        return;
    }

    try {
        const encryptedText = await crypto.encryptMessage(publicKey, message);
        res.json({ encryptedText });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

interface DecryptRequest extends Request {
    body: {
        privateKey: string
        encryptedText: string
    }
}

server.post('/message/decrypt', async (req: DecryptRequest, res: Response) => {
    const { privateKey, encryptedText } = req.body;

    if (!privateKey || !encryptedText) {
        res.status(400).json({ error: '"privateKey" and "encryptedText" are required' }).end();
        return;
    }

    try {
        const message = await crypto.decryptMessage(privateKey, encryptedText);
        res.json({ message });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

export default server;