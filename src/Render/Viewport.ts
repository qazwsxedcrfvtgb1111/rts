import appConfig from '../../config/app-config';
import { Direction } from './Direction';
import { Renderable } from './Renderable';

export class Viewport {
  // units are pixels
  private posX = 0;
  private posY = 0;
  private w: number;
  private h: number;
  private scale: number;
  private mapWidth: number;
  private mapHeight: number;
  private readonly scrollSpeed = appConfig.scrollSpeed;

  constructor(private mapTileWidth: number, private mapTileHeight: number) {
  }

  public init(w: number, h: number, scale: number = appConfig.defaultScale) {
    this.w = w;
    this.h = h;
    this.scale = scale;
    this.calculateDimensions();
  }

  public scroll(direction: Direction) {
    if (direction.up) {
      this.up();
    }
    if (direction.down) {
      this.down();
    }
    if (direction.right) {
      this.right();
    }
    if (direction.left) {
      this.left();
    }
    this.normalizePos();
  }

  public normalize(renderable: Renderable): Renderable {
    //   return renderable;
    renderable.posX = renderable.posX * this.scale - this.posX;
    renderable.posY = renderable.posY * this.scale - this.posY;
    renderable.w *= this.scale;
    renderable.h *= this.scale;
    return renderable;
  }

  public deltaScroll(deltaX: number, deltaY: number) {
    this.posX += deltaX;
    this.posY += deltaY;
    this.normalizePos();
  }

  public findBoundries(spriteSize: number) {
    const scaledSpriteSize = (spriteSize * this.scale);
    const minX = Math.floor(this.posX / scaledSpriteSize);
    const minY = Math.floor(this.posY / scaledSpriteSize);
    const maxX = Math.ceil((this.posX + this.w) / scaledSpriteSize);
    const maxY = Math.ceil((this.posY + this.h) / scaledSpriteSize);

    return {minX, minY, maxX, maxY};
  }

  public setScale(scale: number) {
    this.scale = scale;
  }

  public getScale() {
    return this.scale;
  }

  private calculateDimensions() {
    this.mapWidth = this.mapTileWidth * this.scale * appConfig.spriteSize;
    this.mapHeight = this.mapTileHeight * this.scale * appConfig.spriteSize;
  }

  private right() {
    this.posX += this.scrollSpeed;
  }

  private left() {
    this.posX -= this.scrollSpeed;
  }

  private up() {
    this.posY -= this.scrollSpeed;
  }

  private down() {
    this.posY += this.scrollSpeed;
  }

  private normalizePos() {
    this.posY = Math.max(Math.min(this.posY, this.mapHeight - this.h), 0);
    this.posX = Math.min(Math.max(this.posX, 0), this.mapWidth - this.w);
  }
}
