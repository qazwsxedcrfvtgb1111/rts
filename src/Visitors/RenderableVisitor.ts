import { Renderable } from '../Render/Renderable';
import { IVisitor } from './IVisitor';
import { Tile } from '../Grid/Tile';
import { Viewport } from '../Render/Viewport';
import { BaseVisitor } from './BaseVisitor';

export class RenderableVisitor extends BaseVisitor implements IVisitor {
  private renderables: Array<Renderable> = [];

  public constructor(private viewport: Viewport) {
    super();
  }

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
