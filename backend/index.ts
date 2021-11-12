import createServer from './src/api/infrastructure/server/server';

const start = async () => {
    await createServer();
}

start();

