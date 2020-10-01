import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserSubscriber } from '../entity-subscribers/user-subscriber';
import messages from '../messages/message';

export class ConfigService {
    public readonly MESSAGES = messages;

    constructor() {
        const nodeEnv = this.nodeEnv.toString();
        dotenv.config({
            path: `.env.${nodeEnv}`,
        });

        // Replace \\n with \n to support multiline strings in AWS
        for (const envName of Object.keys(process.env)) {
            process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
        }
    }

    public get(key: string): string {
        return process.env[key];
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }

    get nodeEnv(): string {
        return this.get('NODE_ENV') || 'dev';
    }

    get typeOrmConfig(): TypeOrmModuleOptions {
        let entities = [this.get('ENTITY_PATH')];
        if ((<any>module).hot) {
            const entityContext = (<any>require).context(
                './../../modules',
                true,
                /\.entity\.ts$/,
            );
            entities = entityContext.keys().map((id) => {
                const entityModule = entityContext(id);
                const [entity] = Object.values(entityModule);
                return entity;
            });
        }
        return {
            entities,
            keepConnectionAlive: true,
            type: 'mysql',
            host: this.get('DB_HOST'),
            port: this.getNumber('DB_PORT'),
            username: this.get('DB_USERNAME'),
            password: this.get('DB_PASSWORD'),
            database: this.get('DB_DATABASE'),
            subscribers: [UserSubscriber],
            synchronize: true,
            // migrationsRun: true,
            logging: this.nodeEnv === 'dev',
        };
    }

}
