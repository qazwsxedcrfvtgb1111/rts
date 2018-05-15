import { IVisitor } from './IVisitor';
import { Tile } from '../Grid/Tile';
import { Viewport } from '../Render/Viewport';

export class UpdateVisitor implements IVisitor {

  public readonly visibleOnly = true;

  public constructor(
    private viewport: Viewport,
    private framesPassed: number
  ) {}

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
