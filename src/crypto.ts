import crypto from 'crypto';
import Config from './config';

export const generateKeyPair = (key_size = 2048) => (
    new Promise<{ publicKey: string, privateKey: string }>((resolve, reject) => {
        crypto.generateKeyPair('rsa', {
            modulusLength    : key_size,
            publicKeyEncoding: {
                type  : 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type      : 'pkcs8',
                format    : 'pem',
                cipher    : 'aes-256-cbc',
                passphrase: Config.PRIVATE_KEY_PASSPHRASE
            }
        }, (err, publicKey, privateKey) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({ publicKey, privateKey });
        });
    })
);

export const encryptMessage = (publicKey: string, message: string) => (
    new Promise<string>((resolve, reject) => {
        try {
            const encryptedMessage = crypto.publicEncrypt(
                publicKey,
                Buffer.from(message, 'utf-8')
            );
            resolve(encryptedMessage.toString('base64'));
        } catch (e) {
            reject(e);
        }
    })
);

export const decryptMessage = (privateKey: string, encryptedText: string) => (
    new Promise<string>((resolve, reject) => {
        try {
            const decryptedMessage = crypto.privateDecrypt({
                key       : privateKey,
                passphrase: Config.PRIVATE_KEY_PASSPHRASE
            }, Buffer.from(encryptedText, 'base64'));

            resolve(decryptedMessage.toString('utf-8'));
        } catch (e) {
            reject(e);
        }
    })
);

export default {
    generateKeyPair,
    encryptMessage,
    decryptMessage
};