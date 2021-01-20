<template>
  <v-container />
</template>

<script lang="ts">
import Vue from "vue";
import { Application } from "pixi.js";
import { BinaryTreeNode } from "@/graphics/BinaryTreeNode";

/*
function sampleOne(app: Application) {
  const labels = ["alpha", "beta", "gamma", "delta", "Jeopardy!"];
  const nodes: Node[] = [];
  for (let i = 0; i < 5; i++) {
    const node = new Node(labels[i]);
    node.draw(app.stage, 100, 50 + (node.height + 10) * i);
    nodes.push(node);
  }

  app.ticker.add(() => {
    for (const node of nodes) {
      node.x += Math.random() * 8;
      node.y += 2;
      if (node.x > 500) {
        app.ticker.stop();
      }
    }
  });
}
 */

function sampleTwo(app: Application) {
  const root = new BinaryTreeNode("parent");

  const leftChild = new BinaryTreeNode(
    "left child",
    new BinaryTreeNode("left left child"),
    new BinaryTreeNode(
      "left right child",
      //new BinaryTreeNode("turning over"),
      null,
      new BinaryTreeNode("a new leaf")
    )
  );
  const rightChild = new BinaryTreeNode(
    "right child",
    new BinaryTreeNode("right left child")
  );
  root.setLeftChild(leftChild);
  root.setRightChild(rightChild);

  const rootLayout = root.layOut();
  rootLayout.position.set(150, 50);
  app.stage.addChild(rootLayout);
}

export default Vue.extend({
  name: "PixiTree",

  mounted() {
    const app = new Application({
      antialias: true,
      backgroundColor: 0xf0f0f0,
      width: 1024,
    });
    this.$el.appendChild(app.view); // Add the PIXI canvas to the DOM.a

    // sampleOne(app);
    sampleTwo(app);
  },
});
</script>
