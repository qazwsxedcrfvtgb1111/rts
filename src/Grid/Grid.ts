import { Tile } from './Tile';
import { SpriteLoader } from '../Render/SpriteLoader';
import { TileType } from './TileType';
import { IVisitable } from '../Visitors/IVisitable';
import { IVisitor } from '../Visitors/IVisitor';
import { VisitorContainer } from '../Visitors/VisitorContainer';
import { Viewport } from '../Render/Viewport';
import appConfig from '../../config/app-config';

export class Grid implements IVisitable {
  private readonly map = new Map<number, Map<number, Tile>>();

  public constructor(
    private sprites: SpriteLoader,
    private viewport: Viewport,
    private w: number,
    private h: number
  ) {
    sprites.load().then(() => {
      for (let i = 0; i < this.h; ++i) {
        this.map.set(i, new Map<number, Tile>());
        for (let j = 0; j < this.w; ++j) {
          this.map
            .get(i)
            .set(
              j,
              new Tile(
                Object.values(TileType)[
                  Math.floor(Math.random() * Object.values(TileType).length)
                ],
                this.sprites
              )
            );
        }
      }
    });
  }

  public visit(visitors: VisitorContainer) {
    const viewable = this.viewport.findBoundries(appConfig.spriteSize);
    for (let i = viewable.minY; i < viewable.maxY; ++i) {
      visitors.setTileY(i);
      for (let j = viewable.minX; j < viewable.maxX; ++j) {
        visitors.setTileX(j);
        visitors.visitTile(this.map.get(i).get(j));
      }
    }
  }
}
