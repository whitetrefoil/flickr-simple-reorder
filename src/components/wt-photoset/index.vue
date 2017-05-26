<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <section class="wt-photoset" :class="classes">
    <div class="preview" :style="style"></div>
    <!-- /.preview -->

    <div class="info" :title="photoset.title">
      <div>{{photoset.title}}</div>
      <p>{{photoset.photos}} photos</p>
    </div>
    <!-- /.info -->

    <div class="actions">
      <button type="button"><i class="ivu-icon ivu-icon-play"></i> Reorder</button>
    </div>
    <!-- /.actions -->
  </section>
</template>
