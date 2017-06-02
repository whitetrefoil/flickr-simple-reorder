<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <div class="wt-app">
    <wt-main-nav></wt-main-nav>
    <transition>
      <router-view></router-view>
    </transition>
    <wt-mask :is-showing="isMaskShowing"></wt-mask>
  </div>
</template>
