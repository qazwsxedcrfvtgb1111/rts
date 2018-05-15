import { Direction } from '../Render/Direction';
import { IUserEvent } from './IUserEvent';
import { State } from '../State';

export class DragScrollEvent implements IUserEvent {
  public constructor(private deltaX: number, private deltaY: number) {}

  apply(state: State) {
    state.getViewport().deltaScroll(this.deltaX, this.deltaY);
  }
}
