import { Privilege } from './privilege';

export interface Token {
  exp: number,
  id: string,
  privileges: Array<Privilege>,
  scopes: Array<string>,
  sub: string,
  verified?: boolean, 
}