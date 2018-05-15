import { Direction } from '../Render/Direction';
import { IUserEvent } from './IUserEvent';
import { State } from '../State';

export class ScrollEvent implements IUserEvent {
  public constructor(private direction: Direction) {}

  apply(state: State) {
    state.getViewport().scroll(this.direction);
  }
}
