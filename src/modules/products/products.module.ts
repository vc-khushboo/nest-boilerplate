import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [
        SharedModule
    ],
    controllers: [
        ProductsController
    ],
    providers: [
        ProductsService
    ],
})
export class ProductsModule {}
