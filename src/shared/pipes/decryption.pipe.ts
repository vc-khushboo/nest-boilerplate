import * as Joi from '@hapi/joi';
import * as _ from 'lodash';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { ConfigService } from '../services/config.service';

@Injectable()
export class DecryptionPipe implements PipeTransform {
  constructor() {}

  transform(value) {
      console.log(value);
      let decryptrdData = CryptoJS.AES.decrypt(value.data, 'weriun345345j4j53j');
      let key = JSON.parse(decryptrdData.toString(CryptoJS.enc.Utf8));
      return key;
  }
}