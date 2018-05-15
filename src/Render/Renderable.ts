export class Renderable {

  public srcX: number;
  public srcY: number;
  public srcW: number;
  public srcH: number;

  public constructor(
    public img: HTMLImageElement,
    frame: number,    
    public posX: number,
    public posY: number,
    public w: number,
    public h: number,
  ) {
    this.srcX = 0;
    this.srcY = w * frame;
    this.srcW = w;
    this.srcH = h;
  }
}
