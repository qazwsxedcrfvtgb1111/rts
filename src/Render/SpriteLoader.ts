import { Sprite } from './Sprite';
import sprites from '../../config/sprites';
import { TileType } from '../Grid/TileType';

export class SpriteLoader {
  public readonly sprites = new Map<TileType, Sprite>();
  constructor() {}

  public load(): Promise<void> {
    return new Promise(resolve => {
      if (this.doneLoading()) {
        resolve();
      }
      for (const [name, value] of Object.entries(sprites)) {
        const img = new Image();
        this.sprites.set(<TileType>name, new Sprite(img, 5));
        img.addEventListener(
          'load',
          () => {
            this.sprites.get(<TileType>name).gotLoaded();
            if (this.doneLoading()) {
              resolve();
            }
          },
          false
        );
        img.src = value.src;
      }
    });
  }

  private doneLoading() {
    return !Array.from(this.sprites.values()).find(
      (sprite: Sprite) => !sprite.isLoaded()
    );
  }
}
