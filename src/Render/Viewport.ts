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

  constructor(private mapTileWidth: number, private mapTileHeight: number) {}

  public init(w: number, h: number, scale: number = appConfig.defaultScale) {
    this.w = w;
    this.h = h;
    this.scale = scale;
    this.calculateDimensions();
  }

  private calculateDimensions() {
    this.mapWidth = this.mapTileWidth * this.scale * appConfig.spriteSize;
    this.mapHeight = this.mapTileHeight * this.scale * appConfig.spriteSize;
  }

  public scroll(direction: Direction) {
    switch (direction) {
      case Direction.Down:
        this.down();
        break;
      case Direction.Up:
        this.up();
        break;
      case Direction.Right:
        this.right();
        break;
      case Direction.Left:
        this.left();
        break;
      case Direction.UpLeft:
        this.up();
        this.left();
        break;
      case Direction.UpRight:
        this.up();
        this.right();
        break;
      case Direction.DownLeft:
        this.left();
        this.down();
        break;
      case Direction.DownRight:
        this.down();
        this.right();
        break;
    }
    this.normalizePos();
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
    this.posY = Math.min(this.posY, this.mapHeight - this.h);
    this.posY = Math.max(this.posY, 0);
    this.posX = Math.max(this.posX, 0);
    this.posX = Math.min(this.posX, this.mapWidth - this.w);
  }

  public contains(x: number, y: number) {
    const scaledX = x * this.scale;
    const scaledY = y * this.scale;
    return (
      scaledX <= this.posX + this.w &&
      this.posX <= scaledX + appConfig.spriteSize &&
      scaledY <= this.posY + this.h &&
      this.posY <= scaledY + appConfig.spriteSize
    );
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
}
