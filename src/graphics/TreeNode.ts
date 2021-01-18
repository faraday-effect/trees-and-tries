import { Container, Graphics, InteractionEvent, Text } from "pixi.js";

export class TreeNode {
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

  get pixi(): Container {
    return this.container;
  }

  // public draw(x: number, y: number) {}
}
