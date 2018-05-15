import { State } from '../State';

export interface IUserEvent {
  apply(state: State);
}
