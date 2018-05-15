import { State } from '../State';
import { Canvas } from './Canvas';
import { Viewport } from './Viewport';

export class Renderer {
  private canvas: Canvas;
  
  public constructor(private state: State) {
    this.resized = this.resized.bind(this)
  }

  public render(state: any): void {
    this.canvas.draw(this.state.getRenderables(this.state.getViewport()));
  }

  public setCanvas(canvas: Canvas) {
    this.canvas = canvas;
  }

  public resized(w: number, h: number) {
    this.state.getViewport().init(w, h);
  }
}
