import { Injectable } from '@nestjs/common';
import { getRepository, FindManyOptions } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommonService {
  /**
   * To insert data
   * @param entity
   * @param data
   */
  async insert(entity: string, data: any): Promise<any> {
    const repo = await getRepository(entity);
    const insertedData = repo.create(data);
    return await repo.save(insertedData);
  }

  /**
   * To insert many
   * @param entity
   * @param data
   */
  async insertMany(entity: string, data: Array<any>): Promise<any> {
    return await getRepository(entity)
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  /**
   * Updates a data
   * @param entity
   * @param data
   */
  async update(entity: string, data: any): Promise<any> {
    return await getRepository(entity).save(data);
  }

  /**
   * Updates a data with condition
   * @param entity
   * @param where condition
   * @param data
   */
  async updateWhere(entity: string, where: any, data: any): Promise<any> {
    return await getRepository(entity).update(where, data);
  }

  /**
   * Update many data
   * @param entity
   * @param ids
   * @param data
   */
  async updateMany(
    entity: string,
    ids: Array<number | string>,
    data: any,
  ): Promise<any> {
    return await getRepository(entity)
      .createQueryBuilder()
      .update()
      .set(data)
      .whereInIds(ids)
      .execute();
  }

  /**
   * Update many data
   * @param entity
   * @param where
   * @param data
   */
  async updateManyWhere(
    entity: string,
    where: { condition: string; params: Object },
    data: any,
  ): Promise<any> {
    return await getRepository(entity)
      .createQueryBuilder(entity)
      .update()
      .set(data)
      .where(where.condition, where.params)
      .execute();
  }

  /**
   * Get by Id
   * @param entity
   * @param id
   */
  async getById(entity: string, id: number | string): Promise<any> {
    return await getRepository(entity).findOne(id);
  }

  /**
   * Get by user_id
   * Note: This function assumes that entity
   * has user_id named column
   * @param entity
   * @param user_id
   */
  async getByUserId(entity: string, user_id: number): Promise<any> {
    return await getRepository(entity).find({ where: { user_id } });
  }

  /**
   * Get One by options
   * @param entity
   * @param options
   */
  async getOneByOptions(entity: string, options: any) {
    return await getRepository(entity).findOne(options);
  }

  /**
   * Get by options
   * @param entity
   * @param options
   */
  async getByOptions(entity: string, options: FindManyOptions): Promise<any> {
    return await getRepository(entity).find(options);
  }

  /**
   * Get User by email
   * @param email
   */
  async getUserByEmail(email: string): Promise<any> {
    try {
      const { 0: user }: any[] = await this.getByOptions('users', {
        where: { email },
      });
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Removes data
   * @param id
   */
  async remove(entity: string, id: string | number): Promise<any> {
    const repo = getRepository(entity);
    const data = await repo.findOne(id);
    if (!data) return Promise.reject('No value found to remove');
    return await repo.remove(data);
  }

  /**
   * Removes multiple data
   * @param entity
   * @param ids or
   * @param where
   */
  async removeMany(
    entity: string,
    ids?: Array<number | string>,
    where?: { condition: string; params: any },
  ): Promise<any | Error> {
    const qb = getRepository(entity)
      .createQueryBuilder()
      .delete();
    if (!ids && !where) {
      return Promise.reject(
        new Error('Neither ids nor where is provided as function parameter'),
      );
    }
    if (where) {
      qb.where(where.condition, where.params);
    } else {
      qb.where('entity.ids = :ids', { ids });
    }
    return await qb.execute();
  }

}
