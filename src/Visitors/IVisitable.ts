import { IVisitor } from './IVisitor';

export interface IVisitable {
  visit(visitor: IVisitor, x: number, y: number): void;
}
