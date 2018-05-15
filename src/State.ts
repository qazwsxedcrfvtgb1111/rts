import { SpriteLoader } from './Render/SpriteLoader';
import { Grid } from './Grid/Grid';
import { Renderable } from './Render/Renderable';
import { RenderableVisitor } from './Visitors/RenderableVisitor';
import { Viewport } from './Render/Viewport';
import { Direction } from './Render/Direction';
import { InputHandler } from './Controls/InputHandler';
import { IUserEvent } from './Controls/IUserEvent';
import { UpdateVisitor } from './Visitors/UpdateVisitor';
import { IVisitor } from './Visitors/IVisitor';
import { VisitorContainer } from './Visitors/VisitorContainer';

export class State {
  private grid: Grid;
  private viewport: Viewport;
  public readonly w = 1024;
  public readonly h = 1024;

  private readonly visitors: VisitorContainer;
  private renderableVisitor: RenderableVisitor;

  public constructor(sprites: SpriteLoader, private input: InputHandler) {
    this.viewport = new Viewport(this.w, this.h);
    this.grid = new Grid(sprites, this.viewport, this.w, this.h);
    this.visitors = new VisitorContainer(this.viewport);
    
  }

  public update(updateCount: number) {
    for (const event of this.input.popUserEvents()) {
      event.apply(this);
    }
    this.visitors.push(new UpdateVisitor(this.viewport, updateCount));
    this.renderableVisitor = new RenderableVisitor(this.viewport);
    this.visitors.push(this.renderableVisitor);
    this.grid.visit(this.visitors);
    this.visitors.reset();
  }

  public getRenderables(viewport: Viewport): Array<Renderable> {
    return this.renderableVisitor.getRenderables();
  }

  public getViewport() {
    return this.viewport;
  }
}
