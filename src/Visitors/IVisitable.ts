import { IVisitor } from './IVisitor';

export interface IVisitable {
  visit(visitor: IVisitor): void;
}
