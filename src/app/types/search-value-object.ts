import { ValueObject } from 'jsonld';

export type SearchValueObject = ValueObject & {
  highlight?: string;
  snippet?: string;
};
