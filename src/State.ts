import { SpriteLoader } from './Render/SpriteLoader';
import { Grid } from './Grid/Grid';
import { Renderable } from './Render/Renderable';
import { RenderableVisitor } from './Visitors/RenderableVisitor';
import { Viewport } from './Render/Viewport';
import { InputHandler } from './Controls/InputHandler';
import { UpdateVisitor } from './Visitors/UpdateVisitor';
import { VisitorContainer } from './Visitors/VisitorContainer';

export class State {
  public readonly w = 1024;
  public readonly h = 1024;
  private grid: Grid;
  private viewport: Viewport;
  private readonly visitors: VisitorContainer;
  private renderableVisitor: RenderableVisitor;

  public constructor(sprites: SpriteLoader, private input: InputHandler) {
    this.viewport = new Viewport(this.w, this.h);
    this.grid = new Grid(sprites, this.viewport, this.w, this.h);
    this.visitors = new VisitorContainer();
  }

  public update(updateCount: number) {
    for (const event of this.input.getUserEvents()) {
      event.apply(this);
    }
    this.input.update();
    this.visitors.push(new UpdateVisitor(updateCount));
    this.renderableVisitor = new RenderableVisitor(this.viewport);
    this.visitors.push(this.renderableVisitor);
    this.grid.visit(this.visitors);
    this.visitors.reset();
  }

  public getRenderables(): Array<Renderable> {
    return this.renderableVisitor.getRenderables();
  }

  public getViewport(): Viewport {
    return this.viewport;
  }
}
