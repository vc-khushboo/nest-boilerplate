/**
 * This is seeding data for DB
 * Used for new Database (Or empty)
 * To fill some master data / static data
 */

import { createConnection, getRepository } from 'typeorm';
import { countries } from '../src/shared/seeds/country.seed';
import { cities } from '../src/shared/seeds/city.seed';
import { ConfigService } from '../src/shared/services/config.service';

(async function seedDatabase() {
  try {
    const configService = new ConfigService();
    const conn = await createConnection({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: (configService.getNumber('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [configService.get('ENTITY_PATH')],
    });

    /* await conn.synchronize(true);

    console.info('--------------------------Seeding started: Countries---------------------');
    const countriesSeed = await getRepository('countries').create(countries);
    await getRepository('countries').save(countriesSeed);
    console.info('---------------------------Seeding ended: Countries---------------------');

    console.info('--------------------------Seeding started: Cities---------------------');
    const citiesSeed = await getRepository('cities').create(cities);
    await getRepository('cities').save(citiesSeed);
    console.info('---------------------------Seeding ended: Cities---------------------');

    await conn.close(); */
  } catch (error) {
    console.error('---------------------------Error:');
    console.error(error);
  }
})();
