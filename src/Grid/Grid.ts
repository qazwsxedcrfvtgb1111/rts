import { Tile } from './Tile';
import { SpriteLoader } from '../Render/SpriteLoader';
import { TileType } from './TileType';
import { IVisitable } from '../Visitors/IVisitable';
import { Viewport } from '../Render/Viewport';
import appConfig from '../../config/app-config';
import { IVisitor } from '../Visitors/IVisitor';

export class Grid implements IVisitable {
  private readonly map = new Map<number, Map<number, Tile>>();

  public constructor(private sprites: SpriteLoader,
                     private viewport: Viewport,
                     private w: number,
                     private h: number) {
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

  public visit(visitors: IVisitor) {
    const viewable = this.viewport.findBoundries(appConfig.spriteSize);
    const minX = Math.max(0, viewable.minX);
    const maxX = Math.min(viewable.maxX, this.w);
    for (let i = Math.max(0, viewable.minY); i < Math.min(viewable.maxY, this.h); ++i) {
      visitors.setTileY(i);
      for (let j = minX; j < maxX; ++j) {
        const tile = this.map.get(i).get(j);
        const sprite = tile.getSprite();
        const x = j * sprite.getDimension();
        const y = i * sprite.getDimension();
        visitors.setTileX(j);
        visitors.visitTile(tile, x, y);
      }
    }
  }
}
