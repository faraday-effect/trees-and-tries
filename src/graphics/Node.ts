import { Container, Graphics, InteractionEvent, Text } from "pixi.js";

export class Node {
  private readonly container: Container;

  constructor(private labelText: string) {
    const label = new Text(labelText, { fill: "white" });
    label.position.set(10, 5);

    const rect = new Graphics();
    rect.lineStyle(4, 0x99ccff, 1);
    rect.beginFill(0xff9933);
    rect.drawRoundedRect(0, 0, label.width + 20, label.height + 10, 10);
    rect.endFill();

    const container = new Container();
    container.addChild(rect, label);
    container.interactive = true;
    container.on("click", (event: InteractionEvent) =>
      console.log("click", event)
    );
    this.container = container;
  }

  draw(stage: Container, x = 0, y = 0) {
    console.log("NODE", x, y);
    this.container.position.set(x, y);
    stage.addChild(this.container);
  }

  addToContainer(container: Container): void {
    container.addChild(this.container);
  }

  get x(): number {
    return this.container.x;
  }

  set x(newX: number) {
    this.container.x = newX;
  }

  get cx(): number {
    return this.x + this.width / 2;
  }

  get y(): number {
    return this.container.y;
  }

  set y(newY: number) {
    this.container.y = newY;
  }

  get cy(): number {
    return this.y + this.height / 2;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get height(): number {
    return this.container.height;
  }

  get width(): number {
    return this.container.width;
  }
}
