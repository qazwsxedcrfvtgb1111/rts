import { Sprite } from '../Render/Sprite';
import { SpriteLoader } from '../Render/SpriteLoader';
import { TileType } from './TileType';
import { IVisitable } from '../Visitors/IVisitable';
import { IVisitor } from '../Visitors/IVisitor';

export class Tile implements IVisitable {
  public frame = 0;
  public framesWithoutAnimation = 0;
  private sprite: Sprite;

  public constructor(private type: TileType, sprites: SpriteLoader) {
    this.sprite = sprites.sprites.get(type);
    this.frame = Math.floor(
      Math.random() * this.sprite.getFramesPerAnimation()
    );
  }

  public visit(visitor: IVisitor, x: number, y: number) {
    visitor.visitTile(this, x, y);
  }

  public getSprite() {
    return this.sprite;
  }

  public getFrame() {
    return this.frame;
  }
}
