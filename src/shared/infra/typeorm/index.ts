import { Connection, createConnection, getConnectionOptions } from 'typeorm';


export default async (host = "localhost"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host: host,
            database: process.env.NODE_ENV === "test" ? "postgres" : defaultOptions.database,
        })
    );
};
