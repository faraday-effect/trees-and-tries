import { Node } from "@/graphics/Node";
import { Container } from "pixi.js";
import * as _ from "lodash";
import { SPACE_HORIZONTAL, SPACE_VERTICAL } from "@/graphics/constants";

export class TreeNode extends Node {
  protected children: Node[] = [];

  constructor(private label: string) {
    super(label);
  }

  private childrenWidth() {
    if (_.isEmpty(this.children)) {
      throw new Error("No children");
    }
    return (
      _.chain(this.children)
        .map((child) => child.width)
        .reduce((total, width) => total + width, 0)
        .value() +
      (this.children.length - 1) * SPACE_HORIZONTAL
    );
  }

  draw(stage: Container, x = 0, y = 0) {
    if (_.isEmpty(this.children)) {
      super.draw(stage, x, y);
    } else {
    }
    let offset = 0;
    for (const child of this.children) {
      child.draw(stage, x + offset, y + SPACE_VERTICAL);
      offset += child.width + SPACE_HORIZONTAL;
    }
  }
}
