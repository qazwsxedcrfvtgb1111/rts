import { Sprite } from '../Render/Sprite';
import { SpriteLoader } from '../Render/SpriteLoader';
import { TileType } from './TileType';
import { IVisitable } from '../Visitors/IVisitable';
import { IVisitor } from '../Visitors/IVisitor';
import { VisitorContainer } from '../Visitors/VisitorContainer';

export class Tile implements IVisitable {
  private isInViewport = false;
  private sprite: Sprite;
  public frame = 0;
  public framesWithoutAnimation = 0;

  public constructor(private type: TileType, sprites: SpriteLoader) {
    this.sprite = sprites.sprites.get(type);
    this.frame = Math.floor(
      Math.random() * this.sprite.getFramesPerAnimation()
    );
  }

  public getIsInViewport() {
    return this.isInViewport;
  }

  public setIsInViewport(val: boolean) {
    this.isInViewport = val;
  }

  public visit(visitor: VisitorContainer) {
    visitor.visitTile(this);
  }

  public getSprite() {
    return this.sprite;
  }

  public getFrame() {
    return this.frame;
  }
}
