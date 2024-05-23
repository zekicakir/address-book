import { registerAs } from "@nestjs/config";
 import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

 
 dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: 'localhost',
    port: '8189',
    username: 'postgres',
    password: '123456',
    database: 'DbDeneme',  
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/*/migrations/*{.ts,.js}"],
    autoLoadEntities: true,  
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);
