import { IVisitor } from './IVisitor';
import { Tile } from '../Grid/Tile';
import { BaseVisitor } from './BaseVisitor';

export class UpdateVisitor extends BaseVisitor implements IVisitor {

  public constructor(private framesPassed: number) {
    super();
  }

  public visitTile(tile: Tile) {
    tile.framesWithoutAnimation += this.framesPassed;
    const newFrame = tile
      .getSprite()
      .getNextFrame(tile.frame, tile.framesWithoutAnimation);
    if (newFrame !== tile.frame) {
      tile.framesWithoutAnimation = 0;
      tile.frame = newFrame;
    }
  }
}
