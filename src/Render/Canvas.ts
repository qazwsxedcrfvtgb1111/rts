import { SpriteLoader } from './SpriteLoader';
import { Renderable } from './Renderable';
import { InputHandler } from '../Controls/InputHandler';

export class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private height: number;
  private width;

  public constructor(id: string,
                     private sprites: SpriteLoader,
                     private input: InputHandler,
                     private resizeCb: (w: number, h: number) => void) {
    this.canvas = <HTMLCanvasElement>document.getElementById(id);
    this.initSize = this.initSize.bind(this);
    this.context = this.canvas.getContext('2d');
    this.input.setCanvas(this.canvas);
    window.addEventListener('resize', this.initSize);
    this.initSize();
  }

  public draw(toRender: Array<Renderable>) {

    this.context.clearRect(0, 0, this.width, this.height);
    for (const renderable of toRender) {
      this.context.drawImage(
        renderable.img,
        renderable.srcX,
        renderable.srcY,
        renderable.srcW,
        renderable.srcH,
        renderable.posX,
        renderable.posY,
        renderable.w,
        renderable.h
      );
    }
  }

  private initSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.resizeCb(this.width, this.height);
  }
}
