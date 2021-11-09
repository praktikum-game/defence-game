export interface Drawable {
  draw: (context: CanvasRenderingContext2D) => void;
}

export interface Updateable {
  update: (delay: number) => void;
}
