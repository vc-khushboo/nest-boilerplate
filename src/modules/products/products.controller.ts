import { Controller, HttpCode, Post, HttpStatus, UsePipes, Body, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from '../../shared/pipes/joi-validation.pipe';
import { ProductsService } from './products.service';
import ProductSchemas from './products.validators';
import { AddProduct, EditProduct } from './products.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {

    constructor(
        public readonly productsService: ProductsService
    ) { }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new JoiValidationPipe(ProductSchemas.ADDPRODUCT))
    async productAdd(
        @Body() userLoginDto: AddProduct
    ): Promise<any> {
        return  this.productsService.add(userLoginDto);
    }

    @Get('list')
    @HttpCode(HttpStatus.OK)
    async productList(): Promise<any> {
        return this.productsService.list();
    }

    @Delete('delete/:productId')
    @HttpCode(HttpStatus.OK)
    async productDelete(
        @Param() data: { productId: number}
    ): Promise<any> {
        return  this.productsService.delete(data.productId);
    }

    @Put('edit')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new JoiValidationPipe(ProductSchemas.EDITPRODUCT))
    async productedit(
        @Body() data: EditProduct
    ): Promise<any> {
        return  this.productsService.add(data);
    }
}
