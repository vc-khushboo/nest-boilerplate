import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import AllExceptionsFilter from './shared/filters/all-exception.filter';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // adding global prefix
   app.setGlobalPrefix('api');

   // adding global filter
   app.useGlobalFilters(new AllExceptionsFilter());
 
   /**
    * Adding body-parser
    */
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
 
   /**
    * Helmet can help protect your app from
    * some well-known web vulnerabilities by setting HTTP headers appropriately.
    */
   app.use(helmet());
 
   /**
    * Cross-origin resource sharing (CORS) is a mechanism that
    * allows resources to be requested from another domain.
    */
   app.enableCors();
 
   /**
    * To protect your applications from brute-force attacks,
    * you have to implement some kind of rate-limiting.
    */
   app.use(
     rateLimit({
       windowMs: 15 * 60 * 1000, // 15 minutes
       max: 1000, // limit each IP to 1000 requests per windowMs
     }),
   );
   
  const configService = app.select(SharedModule).get(ConfigService);
  const port = configService.getNumber('PORT');
  await app.listen(port);
}
bootstrap();
