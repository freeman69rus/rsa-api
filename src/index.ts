import Config from './config';
import server from './server';

server.listen(Config.PORT, () => {
    console.log(`Server is running on port ${Config.PORT}`);
});