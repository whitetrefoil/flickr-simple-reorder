<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <transition name="ease">
    <div class="wt-modal" :class="sizeClass" v-show="isShowing">
      <wt-panel :title="title" :color="color">
        <slot></slot>
      </wt-panel>
    </div>
    <!-- /.wt-modal -->
  </transition>
</template>
