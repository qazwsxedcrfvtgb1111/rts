import { Direction } from '../Render/Direction';
import { ScrollEvent } from './ScrollEvent';
import { IUserEvent } from './IUserEvent';
import controls from '../../config/controls';
import { DragScrollEvent } from './DragScrollEvent';
import { InputEventType } from './InputEventType';

export class InputHandler {
  private canvas: HTMLCanvasElement;
  private rect: ClientRect;

  private w: number;
  private h: number;

  // how close to the edge to start scrolling
  private readonly scrollZone = 50;

  private mouseX: number;
  private mouseY: number;

  private dragBeginX: number;
  private dragBeginY: number;
  private dragging = false;
  private dragBtn: number;

  private userEvents: Array<IUserEvent> = [];

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      this.mouseX = event.clientX - this.rect.left;
      this.mouseY = event.clientY - this.rect.top;
    });

    canvas.addEventListener('mouseup', (event: MouseEvent) => {
      this.dragging = false;
    });

    canvas.addEventListener('mousedown', (event: MouseEvent) => {
      event.preventDefault();
      this.dragBeginX = this.mouseX;
      this.dragBeginY = this.mouseY;
      this.dragging = true;
      this.dragBtn = event.button;
    });
  }

  public popUserEvents(): Array<IUserEvent> {
    const events = [...this.userEvents, ...this.getMousePosEvents()];
    this.userEvents = [];
    return events;
  }

  public resized(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.rect = this.canvas.getBoundingClientRect();
  }

  private getMousePosEvents(): Array<IUserEvent> {
    const events = [];
    let dir: Direction;
    if (this.isUpScroll()) {
      if (this.isLeftScroll()) {
        dir = Direction.UpLeft;
      } else if (this.isRightScroll()) {
        dir = Direction.UpRight;
      } else {
        dir = Direction.Up;
      }
    } else if (this.isDownScroll()) {
      if (this.isLeftScroll()) {
        dir = Direction.DownLeft;
      } else if (this.isRightScroll()) {
        dir = Direction.DownRight;
      } else {
        dir = Direction.Down;
      }
    } else if (this.isLeftScroll()) {
      dir = Direction.Left;
    } else if (this.isRightScroll()) {
      dir = Direction.Right;
    }

    if (this.dragging) {
      for (const [key, value] of Object.entries(controls)) {
        if (String(this.dragBtn) === value.key.toString()) {
          switch (key) {
            case InputEventType.DragScroll.toString():
              events.push(
                new DragScrollEvent(
                  this.dragBeginX - this.mouseX,
                  this.dragBeginY - this.mouseY
                )
              );
          }
        }
      }
      this.dragBeginX = this.mouseX;
      this.dragBeginY = this.mouseY;
    } else if (dir !== undefined) {
      events.push(new ScrollEvent(dir));
    }
    return events;
  }

  private isLeftScroll() {
    return this.mouseX < this.scrollZone;
  }

  private isRightScroll() {
    return this.w - this.scrollZone < this.mouseX;
  }

  private isUpScroll() {
    return this.mouseY < this.scrollZone;
  }

  private isDownScroll() {
    return this.h - this.scrollZone < this.mouseY;
  }
}
