import { IVisitor } from './IVisitor';
import { Tile } from '../Grid/Tile';
import { Viewport } from '../Render/Viewport';
import appConfig from '../../config/app-config';

export class VisitorContainer {
  private x: number;
  private y: number;
  private visitors: Array<IVisitor> = [];

  public constructor(private viewport: Viewport) {}

  public setTileX(x: number) {
    this.x = x;
  }

  public setTileY(y: number) {
    this.y = y;
  }

  public push(visitor: IVisitor) {
    this.visitors.push(visitor);
  }

  public reset() {
    this.visitors = [];
  }

  public visitTile(tile: Tile) {

    const sprite = tile.getSprite();
    const x = this.x * sprite.getDimension();
    const y = this.y * sprite.getDimension();
    
    for (const visitor of this.visitors) {
      visitor.visitTile(tile, x, y);
    }    
  }
}
