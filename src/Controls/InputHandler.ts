import { ScrollEvent } from './ScrollEvent';
import { UserEvent } from './UserEvent';
import { DragScrollEvent } from './DragScrollEvent';
import { MouseControlKeys } from './MouseControlKeys';
import { ZoomEvent } from './ZoomEvent';
import { InputState } from './InputState';

export class InputHandler {
  private canvas: HTMLCanvasElement;
  private rect: ClientRect;

  private dragBeginX: number;
  private dragBeginY: number;

  private inputState: InputState = new InputState;
  private readonly singleFrameKeys = [MouseControlKeys.WheelDown, MouseControlKeys.WheelUp];

  private readonly userEvents: Array<UserEvent> = [
    new DragScrollEvent(this.inputState),
    new ScrollEvent(this.inputState),
    new ZoomEvent(this.inputState),
  ];

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      this.inputState.mouseX = event.clientX - this.rect.left;
      this.inputState.mouseY = event.clientY - this.rect.top;
    });

    canvas.addEventListener('mouseup', (event: MouseEvent) => {
      this.inputState.dragging = false;
      this.inputState.pressedKeys = this.inputState.pressedKeys.filter(key => key !== event.button);
    });

    canvas.addEventListener('mousedown', (event: MouseEvent) => {
      event.preventDefault();
      this.dragBeginX = this.inputState.mouseX;
      this.dragBeginY = this.inputState.mouseY;
      this.inputState.dragging = true;
      this.inputState.pressedKeys.push(event.button);
    });

    canvas.addEventListener('wheel', (event: WheelEvent) => {
      event.preventDefault();
      this.inputState.pressedKeys.push(event.wheelDelta > 0 ? MouseControlKeys.WheelUp : MouseControlKeys.WheelDown);
    });
  }

  public getUserEvents(): Array<UserEvent> {
    if (this.inputState.dragging) {
      this.inputState.dragX = this.dragBeginX - this.inputState.mouseX;
      this.inputState.dragY = this.dragBeginY - this.inputState.mouseY;
      this.dragBeginX = this.inputState.mouseX;
      this.dragBeginY = this.inputState.mouseY;
    }
    return this.userEvents;
  }

  public update() {
    this.inputState.pressedKeys = this.inputState.pressedKeys.filter(key => !this.singleFrameKeys.includes(key));
  }

  public resized(w: number, h: number) {
    this.inputState.w = w;
    this.inputState.h = h;
    this.rect = this.canvas.getBoundingClientRect();
  }
}
