import { State } from '../State';
import { InputState } from './InputState';

export abstract class UserEvent {


  constructor(protected inputState: InputState) {
  }

  public abstract apply(state: State);
}
