import { Graphics } from "pixi.js";

export function makeLine(x1: number, y1: number, x2: number, y2: number) {
  const line = new Graphics();
  line.lineStyle(4, 0, 1);
  line.moveTo(x1, y1);
  line.lineTo(x2, y2);
  return line;
}
