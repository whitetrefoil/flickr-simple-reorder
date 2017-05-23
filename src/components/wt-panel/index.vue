<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <section class="wt-panel" :class="cardClass">
    <h4 class="wt-panel-title" :class="titleClass">{{title}}</h4>
    <p class="wt-panel-content">
      <slot></slot>
    </p>
  </section>
</template>
