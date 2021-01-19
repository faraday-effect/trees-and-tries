import { Container, Graphics, InteractionEvent, Text } from "pixi.js";
import { EMPTY_NODE_RADIUS, makeCircle } from "@/graphics/helpers";

export class Node {
  constructor(private labelText: string) {}

  layOut(): Container {
    const label = new Text(this.labelText, { fill: "white" });
    label.position.set(10, 5);

    const rect = new Graphics();
    rect.lineStyle(1, 0, 1);
    rect.beginFill(0x00a0a0);
    rect.drawRoundedRect(0, 0, label.width + 20, label.height + 10, 10);
    rect.endFill();

    const container = new Container();
    container.addChild(rect, label);
    container.interactive = true;
    container.on("click", (event: InteractionEvent) =>
      console.log("click", event)
    );

    return container;
  }

  toString(): string {
    return this.labelText;
  }
}

export class EmptyNode {
  layOut(): Container {
    console.log("EMPTY");
    const circle = makeCircle(EMPTY_NODE_RADIUS);
    circle.position.x = EMPTY_NODE_RADIUS;
    const container = new Container();
    container.addChild(circle);
    return container;
  }
}
