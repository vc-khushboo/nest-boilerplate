import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { HttpStatus, HttpException } from '@nestjs/common';

export class UtilsService {

    /**
     * generate hash from password or string
     * @param {string} password
     * @returns {string}
     */
    static generateHash(password: string): string {
        return bcrypt.hashSync(password, 10);
    }
    
    /**
     * validate text with hash
     * @param {string} password
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    static validateHash(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash || '');
    }

    static sendSuccessResponse(
        messages: string | any,
        status: HttpStatus,
        isSuccess: boolean
      ) :  any {
        return {
          status,
          success: isSuccess,
          result: messages,
        };
      }
      
    static sendErrorResponse(
        messages: string,
        status: HttpStatus,
        isSuccess: boolean,
      ) : HttpException {
        return new HttpException({
            status,
            success: isSuccess,
            result: messages,
        }, status);
      }

   
}
