import { IVisitor } from './IVisitor';
import { Tile } from '../Grid/Tile';

export abstract class BaseVisitor implements IVisitor {

  protected x: number;
  protected y: number;

  public setTileX(x: number) {
    this.x = x;
  }

  public setTileY(y: number) {
    this.y = y;
  }

  public abstract visitTile(tile: Tile, dimensionX: number, dimensionY: number): void;
}