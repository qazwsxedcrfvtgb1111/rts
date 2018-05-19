import { State } from './State';
import { Renderer } from './Render/Renderer';
import { Canvas } from './Render/Canvas';
import { SpriteLoader } from './Render/SpriteLoader';
import { InputHandler } from './Controls/InputHandler';

export class Startup {
  private renderer: Renderer;
  private state: State;
  private lastTick: number = 0;
  private tickDuration: number;
  private canvas: Canvas;
  private sprites: SpriteLoader;

  public constructor(private config: any) {
    this.frame = this.frame.bind(this);
  }

  public main() {
    this.tickDuration = 1000 / this.config.calculationalFps;
    this.sprites = new SpriteLoader();
    const input = new InputHandler();
    this.state = new State(this.sprites, input);
    this.renderer = new Renderer(this.state);

    this.canvas = new Canvas(
      this.config.canvasId,
      this.sprites,
      input,
      (w, h) => {
        this.renderer.resized(w, h);
        input.resized(w, h);
      }
    );
    this.renderer.setCanvas(this.canvas);
    this.sprites.load().then(() => {
      requestAnimationFrame(this.frame);
    });
  }

  private frame(timestamp: number) {
    const nextTick = this.tickDuration + this.lastTick;
    let numTicks = 0;
    if (nextTick < timestamp) {
      numTicks = Math.floor((timestamp - this.lastTick) / this.tickDuration);
    }
    this.state.update(numTicks);
    this.renderer.render();
    if (numTicks) {
      this.lastTick = timestamp;
    }
    requestAnimationFrame(this.frame);
  }
}
