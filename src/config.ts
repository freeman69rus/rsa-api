import 'dotenv/config';

export default {
    PORT                  : Number(process.env.PORT || 3000),
    PRIVATE_KEY_PASSPHRASE: process.env.PRIVATE_KEY_PASSPHRASE || 'DEV_PHRASE_0110'
};