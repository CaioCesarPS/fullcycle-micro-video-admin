import { Entity } from '../entity';
import { ValueObject } from '../value-object';

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  BulkInsert(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entity_id: E): Promise<void>;

  findById(entity_id: EntityId): Promise<E>;
  findAll(): Promise<E[]>;
  getEntity(): new (...args: any[]) => E;
}
