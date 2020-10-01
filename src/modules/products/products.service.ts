import { Injectable, HttpStatus } from '@nestjs/common';
import { AddProduct } from './products.interface';
import { CommonService } from '../../shared/services/common.service';
import { UtilsService } from '../../shared/providers/utils.service';
import { getRepository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(
        public readonly commonService: CommonService
    ) { }

    async add(product: AddProduct): Promise<any> {
        try{
            await getRepository('products').save(product)
            return UtilsService.sendSuccessResponse('success', HttpStatus.OK, true);
        }catch(error) {
            throw error;
        }
    }

    async list(): Promise<any> {
        try{
            const products = await getRepository('products').find();
            return UtilsService.sendSuccessResponse(products, HttpStatus.OK, true);
        }catch(error) {
            throw error;
        }
    }

    async delete(id: number): Promise<any> {
        try{
            await this.commonService.remove('products', id)
            return UtilsService.sendSuccessResponse('success', HttpStatus.OK, true);
        }catch(error) {
            throw error;
        }
    }

}
