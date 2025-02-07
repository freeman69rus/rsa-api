import request from 'supertest';
import server from '../src/server';

describe('Test crypto API', () => {
    const message = 'TEST message';
    let publicKey: string,
        privateKey: string,
        encryptedText: string;

    it('"POST /keys/create" should return crypto pair successfully', async () => {
        const response = await request(server)
            .post('/keys/create')
            .send();

        publicKey = response.body.publicKey;
        privateKey = response.body.privateKey;

        console.log('Public Key:\n\n', publicKey?.substring(0, 100), '...\n');
        console.log('Private Key:\n\n', privateKey?.substring(0, 100), '...\n');

        expect(publicKey).toBeTruthy();
        expect(privateKey).toBeTruthy();
    });

    it('"POST /message/encrypt" should encrypt a message successfully', async () => {
        const response = await request(server)
            .post('/message/encrypt')
            .send({ publicKey, message });

        expect(response.status).toBe(200);
        expect(response.body.encryptedText).toBeDefined();

        encryptedText = response.body.encryptedText;
        console.log('Encrypted Text:\n', encryptedText.substring(0, 100), '...\n');
    });

    it('"POST /message/decrypt" should decrypt a message successfully', async () => {
        const decryptResponse = await request(server)
            .post('/message/decrypt')
            .send({ privateKey, encryptedText });

        expect(decryptResponse.status).toBe(200);
        expect(decryptResponse.body.message).toBe(message);
        console.log(
            'Original Message: ', message, '\n' +
            'Decrypted Message:', decryptResponse.body.message, '\n'
        );
    });
});
