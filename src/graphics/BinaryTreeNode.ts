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
        const parentWidth = parentLayout.width;
        const childrenWidth =
          leftLayout.width + SPACE_HORIZONTAL + rightLayout.width;

        if (parentWidth >= childrenWidth) {
          // Parent is at least as wide.
          parentLayout.position.set(0, 0);
          const margin = (parentWidth - childrenWidth) / 2;
          leftLayout.position.set(margin, SPACE_VERTICAL);
          rightLayout.position.set(
            parentWidth - margin - rightLayout.width,
            SPACE_VERTICAL
          );
        } else {
          // Children are wider.
          const childrenMidpoint = leftLayout.width + halfHorizontal;

          const parentX = Math.max(childrenMidpoint - parentWidth / 2, 0);
          parentLayout.position.set(parentX, 0);
          leftLayout.position.set(0, SPACE_VERTICAL);
          rightLayout.position.set(
            childrenWidth - rightLayout.width,
            SPACE_VERTICAL
          );
        }
      } else {
        // Only left
        parentLayout.position.set(
          leftLayout.width + halfHorizontal - parentLayout.width / 2,
          0
        );
        leftLayout.position.set(0, SPACE_VERTICAL);
      }
    } else if (rightLayout) {
      // Only right
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

    if (leftLayout) {
      container.addChild(edge(parentLayout, leftLayout));
      container.addChild(leftLayout);
    }

    if (rightLayout) {
      container.addChild(edge(parentLayout, rightLayout));
      container.addChild(rightLayout);
    }

    container.addChild(parentLayout);

    if (SHOW_BOUNDING_BOXES) {
      const rect = makeRectangle(container.width, container.height);
      container.addChild(rect);
    }

    return container;
  }
}
