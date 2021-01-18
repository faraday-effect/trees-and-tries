<template>
  <v-container />
</template>

<script lang="ts">
import Vue from "vue";
import { Application } from "pixi.js";
import { Node } from "@/graphics/Node";
import { BinaryTreeNode } from "@/graphics/BinaryTreeNode";

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

function sampleTwo(app: Application) {
  const root = new BinaryTreeNode("parent");
  root.leftChild = new BinaryTreeNode("left child");
  root.rightChild = new BinaryTreeNode("right child");
  app.stage.addChild(root.layOut());
}

export default Vue.extend({
  name: "PixiTree",

  mounted() {
    const app = new Application({
      antialias: true,
      backgroundColor: 0xf0f0f0,
    });
    this.$el.appendChild(app.view); // Add the PIXI canvas to the DOM.a

    // sampleOne(app);
    sampleTwo(app);
  },
});
</script>
