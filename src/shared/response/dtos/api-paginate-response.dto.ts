import { Request } from 'express';
import { Filter } from '@common/dtos';

export class ApiPaginateResponseInput<T> {
  count!: number;
  data!: T[];
  query!: Filter<T>;
  req?: Request;
}

export class ApiPaginateResponse<T> {
  next?: string | null;
  previous?: string | null;
  count!: number;
  results!: T[];
}
