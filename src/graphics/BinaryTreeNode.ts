import { EmptyNode, Node } from "@/graphics/Node";
import { Container } from "pixi.js";
import {
  edge,
  makeRectangle,
  SPACE_HORIZONTAL,
  SPACE_VERTICAL,
} from "@/graphics/helpers";

type OptBinaryTreeNode = BinaryTreeNode | EmptyNode | null;

const USE_EMPTY_NODES = true;
const SHOW_BOUNDING_BOXES = true;

export class BinaryTreeNode {
  private leftChild: OptBinaryTreeNode;
  private rightChild: OptBinaryTreeNode;
  private readonly parent: Node;

  constructor(
    label: string,
    left: OptBinaryTreeNode = null,
    right: OptBinaryTreeNode = null
  ) {
    this.parent = new Node(label);
    this.leftChild = left || (USE_EMPTY_NODES ? new EmptyNode() : null);
    this.rightChild = right || (USE_EMPTY_NODES ? new EmptyNode() : null);
  }

  toString(): string {
    return `${this.constructor.name}("${this.parent}")`;
  }

  setLeftChild(child: BinaryTreeNode): void {
    this.leftChild = child;
  }

  setRightChild(child: BinaryTreeNode): void {
    this.rightChild = child;
  }

  layOut(): Container {
    console.log(`LAY OUT ${this}`, this);

    const parentLayout = this.parent.layOut();
    const leftLayout = this.leftChild?.layOut();
    const rightLayout = this.rightChild?.layOut();
    const halfHorizontal = SPACE_HORIZONTAL / 2;

    if (leftLayout) {
      if (rightLayout) {
        // Both left and right
        console.log(`BOTH ${this.parent}`);

        const parentWidth = parentLayout.width;
        const childrenWidth =
          leftLayout.width + SPACE_HORIZONTAL + rightLayout.width;
        const width = Math.max(parentWidth, childrenWidth);
        console.log(parentWidth, childrenWidth, width);

        const centerX = width / 2;
        console.log("HALVES", centerX, halfHorizontal);

        parentLayout.position.set(centerX - parentWidth / 2, 0);

        leftLayout.position.set(
          centerX - halfHorizontal - leftLayout.width,
          SPACE_VERTICAL
        );

        rightLayout.position.set(centerX + halfHorizontal, SPACE_VERTICAL);
      } else {
        // Only left
        console.log("ONLY LEFT");

        parentLayout.position.set(
          leftLayout.width + halfHorizontal - parentLayout.width / 2,
          0
        );

        leftLayout.position.set(0, SPACE_VERTICAL);
      }
    } else if (rightLayout) {
      // Only right
      console.log("ONLY RIGHT");

      parentLayout.position.set(0, 0);

      rightLayout.position.set(
        parentLayout.width / 2 + halfHorizontal,
        SPACE_VERTICAL
      );
    } else {
      // No children.
      return parentLayout;
    }

    const container = new Container();
    console.log("BOUNDS 1", container.getLocalBounds());

    if (leftLayout) {
      console.log("LINE LEFT", leftLayout);
      container.addChild(edge(parentLayout, leftLayout));
      container.addChild(leftLayout);
    }
    console.log("BOUNDS AFTER LEFT", container.getLocalBounds());

    if (rightLayout) {
      console.log("LINE RIGHT");
      container.addChild(edge(parentLayout, rightLayout));
      container.addChild(rightLayout);
    }
    console.log("BOUNDS AFTER RIGHT", container.getLocalBounds());

    container.addChild(parentLayout);
    console.log("BOUNDS AFTER PARENT", container.getLocalBounds());

    if (SHOW_BOUNDING_BOXES) {
      const rect = makeRectangle(container.width, container.height);
      rect.position.set(0, 0);
      container.addChild(rect);
    }
    console.log("BOUNDS AFTER BOX", container.getLocalBounds());

    return container;
  }
}
