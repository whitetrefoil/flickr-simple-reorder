<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <section class="wt-panel" :class="panelClass">
    <h4 class="wt-panel-title">{{title}}</h4>
    <div class="wt-panel-content">
      <slot></slot>
    </div>
  </section>
</template>
