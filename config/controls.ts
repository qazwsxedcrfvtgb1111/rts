import { InputEventType } from '../src/Controls/InputEventType';
import { MouseControlKeys } from '../src/Controls/MouseControlKeys';

export default {
  [InputEventType.DragScroll]: {
    key: MouseControlKeys.LeftMouseButton
  },
  [InputEventType.ZoomIn]: {
    key: MouseControlKeys.WheelUp
  },
  [InputEventType.ZoomOut]: {
    key: MouseControlKeys.WheelDown
  }
};