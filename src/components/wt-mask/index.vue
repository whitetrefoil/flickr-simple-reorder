<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <transition name="fade">
    <div class="wt-mask" v-show="isShowing"></div>
  </transition>
</template>
