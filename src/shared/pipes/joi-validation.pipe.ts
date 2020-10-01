import * as _ from 'lodash';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) { }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any, _metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if(error) {
      throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: JSON.stringify(error.details)
      })
    }
    return value;
  }
}