<template>
  <v-container />
</template>

<script lang="ts">
import Vue from "vue";
import { Application, Container } from "pixi.js";
import { TreeNode } from "@/graphics/TreeNode";

export default Vue.extend({
  name: "PixiTree",

  mounted: function() {
    const app = new Application({
      backgroundColor: 0xf0f0f0
    });
    this.$el.appendChild(app.view); // Add the PIXI canvas to the DOM.a

    const labels = ["alpha", "beta", "gamma", "delta", "Jeopardy!"];
    const nodes: Container[] = [];
    for (let i = 0; i < 5; i++) {
      const node = new TreeNode(labels[i]).pixi;
      node.position.set(100, 50 + (node.height + 10) * i);
      app.stage.addChild(node); // The `stage` is the root PIXI.Container.
      nodes.push(node);
    }

    app.ticker.add((...args) => {
      for (const node of nodes) {
        node.x += Math.random() * 8;
        if (node.x > 500) {
          app.ticker.stop();
        }
      }
    });
  }
});
</script>
