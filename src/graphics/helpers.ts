import { Container, Graphics } from "pixi.js";

export const SPACE_HORIZONTAL = 45;
export const SPACE_VERTICAL = 75;
export const EMPTY_NODE_RADIUS = 10;

export function makeLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): Graphics {
  const line = new Graphics();
  line.lineStyle(4, 0x00a0a0, 1);
  line.moveTo(x1, y1);
  line.lineTo(x2, y2);
  return line;
}

export function centerX(c: Container) {
  return c.x + c.width / 2;
}

export function centerY(c: Container) {
  return c.y + c.height / 2;
}

export function edge(fromLayout: Container, toLayout: Container): Graphics {
  return makeLine(
    centerX(fromLayout),
    centerY(fromLayout),
    centerX(toLayout),
    toLayout.y
  );
}

export function makeCircle(radius: number): Graphics {
  const circle = new Graphics();
  circle.beginFill(0, 0.2);
  circle.drawCircle(0, 0, radius);
  circle.endFill();
  return circle;
}

export function makeRectangle(width: number, height: number): Graphics {
  const rect = new Graphics();
  rect.lineStyle(1, 0x800000, 1);
  rect.drawRect(0, 0, width, height);
  return rect;
}
