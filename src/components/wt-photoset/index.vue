<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <section class="wt-photoset" :class="classes">
    <div class="preview" :style="style"></div>
    <!-- /.preview -->

    <div class="info" :title="photoset.title">
      <div><a :href="photosetUrl" target="_blank">{{photoset.title}}</a></div>
      <p>{{photoset.photos}} photos</p>
    </div>
    <!-- /.info -->

    <div class="actions">
      <button v-if="status === 'done'" type="button" @click="click(photoset)" class="done"><i class="ivu-icon ivu-icon-checkmark"></i> Done</button>
      <button v-else-if="status === 'processing'" type="button" @click="click(photoset)" class="processing"><i class="ivu-icon ivu-icon-play"></i> Processing&hellip;&hellip;</button>
      <button v-else-if="status === 'skipped'" type="button" @click="click(photoset)" class="skipped"><i class="ivu-icon ivu-icon-checkmark"></i> Skipped</button>
      <button v-else-if="status === 'error'" type="button" @click="click(photoset)" class="error"><i class="ivu-icon ivu-icon-alert"></i> Error</button>
      <button v-else type="button" @click="click(photoset)"><i class="ivu-icon ivu-icon-compose"></i> Reorder</button>
    </div>
    <!-- /.actions -->
  </section>
</template>
