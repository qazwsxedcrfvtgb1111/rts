import { Tile } from '../Grid/Tile';

export interface IVisitor {
  visitTile(tile: Tile, dimensionX: number, dimensionY: number): void;

  setTileX(x: number);

  setTileY(y: number)
}
