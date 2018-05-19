import { UserEvent } from './UserEvent';
import { State } from '../State';
import controls from '../../config/controls';
import { InputEventType } from './InputEventType';

export class DragScrollEvent extends UserEvent {

  public apply(state: State) {
    if (this.inputState.pressedKeys.includes(controls[InputEventType.DragScroll].key)) {
      state.getViewport().deltaScroll(this.inputState.dragX, this.inputState.dragY);
    }
  }
}
