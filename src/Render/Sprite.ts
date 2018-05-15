export class Sprite {
  private framesInSprite: number;
  private loaded = false;
  private dimension: number;
  public constructor(
    private image: HTMLImageElement,
    private framesPerAnimation: number
  ) {
  }

  public gotLoaded() {
    this.dimension = this.image.naturalWidth;
    this.framesInSprite = this.image.naturalHeight / this.dimension;
    this.loaded = true;
  }

  public isLoaded() {
    return this.loaded;
  }

  public getImage(): HTMLImageElement {
    return this.image;
  }

  public getFramesPerAnimation(): number {
    return this.framesPerAnimation;
  }

  public getNextFrame(currentFrame: number, passedFrames: number) {
    const iteratedAnimationFrames = Math.floor(
      passedFrames / this.framesPerAnimation
    );
    return (currentFrame + iteratedAnimationFrames) % this.framesInSprite;
  }

  public getDimension() {
    return this.dimension;
  }
}
