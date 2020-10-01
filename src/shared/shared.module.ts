import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { CommonService } from './services/common.service';

const providers = [
    ConfigService,
    CommonService
];
@Module({
    providers,
    imports: [
        HttpModule
    ],
    exports: [...providers, HttpModule]
})
export class SharedModule {}
