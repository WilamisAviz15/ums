import { Like, Equal, In } from 'typeorm';

interface FilterObject {
  [key: string]: any;
}

export const createFilters = (filters): FilterObject => {
  const where: FilterObject = {};
  for (const key in filters) {
    if (filters.hasOwnProperty(key) && filters[key]) {
      const element = filters[key];
      where[key] = Array.isArray(element)
        ? In(element)
        : isNaN(element) && key !== 'status'
          ? Like(`%${element}%`)
          : Equal(element);
    }
  }

  return where;
};

const isNaN = (param): boolean => !Number(param);
