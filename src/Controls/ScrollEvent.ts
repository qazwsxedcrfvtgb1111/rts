import { Direction } from '../Render/Direction';
import { UserEvent } from './UserEvent';
import { State } from '../State';

export class ScrollEvent extends UserEvent {

  // how close to the edge to start scrolling
  private readonly scrollZone = 50;

  public apply(state: State) {
    let dir: Direction = {};
    dir.up = this.isUpScroll();
    dir.down = this.isDownScroll();
    dir.left = this.isLeftScroll();
    dir.right = this.isRightScroll();
    state.getViewport().scroll(dir);
  }

  private isLeftScroll() {
    return this.inputState.mouseX < this.scrollZone;
  }

  private isRightScroll() {
    return this.inputState.w - this.scrollZone < this.inputState.mouseX;
  }

  private isUpScroll() {
    return this.inputState.mouseY < this.scrollZone;
  }

  private isDownScroll() {
    return this.inputState.h - this.scrollZone < this.inputState.mouseY;
  }
}
