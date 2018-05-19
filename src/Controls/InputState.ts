import { MouseControlKeys } from './MouseControlKeys';

export class InputState {
  public dragX: number;
  public dragY: number;
  public dragging = false;
  public w: number;
  public h: number;
  public mouseX: number;
  public mouseY: number;

  public pressedKeys: Array<MouseControlKeys> = [];
}
