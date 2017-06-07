<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <div class="wt-progress">
    <div class="success" :style="successStyle"></div>
    <!-- /.success -->
    <div class="skipped" :style="skippedStyle"></div>
    <!-- /.warning -->
    <div class="failure" :style="failureStyle"></div>
    <!-- /.failure -->
  </div>
  <!-- /.wt-progress -->
</template>
