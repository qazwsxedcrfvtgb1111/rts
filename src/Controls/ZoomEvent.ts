import { UserEvent } from './UserEvent';
import { State } from '../State';
import controls from '../../config/controls';
import { InputEventType } from './InputEventType';
import appConfig from '../../config/app-config';

export class ZoomEvent extends UserEvent {

  public apply(state: State) {


    if (this.inputState.pressedKeys.includes(controls[InputEventType.ZoomIn].key)) {
      this.zoom(state, false);
    } else if (this.inputState.pressedKeys.includes(controls[InputEventType.ZoomOut].key)) {
      this.zoom(state, true);
    }
  }

  private zoom(state: State, out: boolean) {
    const viewport = state.getViewport();
    const scaleChange = viewport.getScale() * appConfig.scaleChange * (out ? -1 : 1);
    viewport.setScale(viewport.getScale() + scaleChange);
    state.getViewport().deltaScroll(
      (this.inputState.mouseX + this.inputState.w) * scaleChange,
      (this.inputState.mouseY + this.inputState.h) * scaleChange
    );
  }
}
