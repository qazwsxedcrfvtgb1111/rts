import { IVisitor } from './IVisitor';
import { Tile } from '../Grid/Tile';
import { BaseVisitor } from './BaseVisitor';

export class VisitorContainer extends BaseVisitor implements IVisitor {
  private visitors: Array<IVisitor> = [];

  public push(visitor: IVisitor) {
    this.visitors.push(visitor);
  }

  public reset() {
    this.visitors = [];
  }

  public visitTile(tile: Tile, x: number, y: number) {
    for (const visitor of this.visitors) {
      visitor.visitTile(tile, x, y);
    }
  }
}
