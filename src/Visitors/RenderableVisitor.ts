import { Renderable } from '../Render/Renderable';
import { IVisitor } from './IVisitor';
import { Tile } from '../Grid/Tile';
import appConfig from '../../config/app-config';
import { Viewport } from '../Render/Viewport';

export class RenderableVisitor implements IVisitor {
  private renderables: Array<Renderable> = [];

  public constructor(private viewport: Viewport) {}

  public visitTile(tile: Tile, dimensionX: number, dimensionY: number) {
    const sprite = tile.getSprite();
      this.renderables.push(
        this.viewport.normalize(
          new Renderable(
            sprite.getImage(),
            tile.getFrame(),
            dimensionX,
            dimensionY,
            sprite.getDimension(),
            sprite.getDimension()
          )
        )
      );
  }

  public getRenderables() {
    return this.renderables;
  }
}
