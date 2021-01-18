import { Node } from "@/graphics/Node";
import { Container } from "pixi.js";
import { SPACE_HORIZONTAL, SPACE_VERTICAL } from "@/graphics/constants";
import { makeLine } from "@/graphics/Line";

export class BinaryTreeNode extends Node {
  private _leftChild: Node | undefined;
  private _rightChild: Node | undefined;

  constructor(label: string) {
    super(label);
  }

  set leftChild(child: Node) {
    this._leftChild = child;
  }

  set rightChild(child: Node) {
    this._rightChild = child;
  }

  layOut(): Container {
    const container = new Container();

    if (this._leftChild && this._rightChild) {
      const childrenWidth =
        this._leftChild.width + this._rightChild.width + SPACE_HORIZONTAL;

      // Parent
      this.setPosition(childrenWidth / 2 - this.width / 2, 0);

      // Left child
      this._leftChild.setPosition(0, SPACE_VERTICAL);
      container.addChild(
        makeLine(this.cx, this.cy, this._leftChild.cx, this._leftChild.cy)
      );

      // Right child
      this._rightChild.setPosition(
        this._leftChild.width + SPACE_HORIZONTAL,
        SPACE_VERTICAL
      );
      container.addChild(
        makeLine(this.cx, this.cy, this._rightChild.cx, this._rightChild.cy)
      );

      this._leftChild.addToContainer(container);
      this.addToContainer(container);
      this._rightChild.addToContainer(container);
    }

    return container;
  }
}
