export interface Drawable {
  draw: (context: CanvasRenderingContext2D) => void;
}

export interface Updateable {
  update: (delay: number) => void;
}

export interface Constructable<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any): T;
}
