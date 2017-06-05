<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <wt-modal title="Reordering" size="small" :color="color" :is-showing="isShowing">
    <div class="progress">
      <p>
        <span class="total-progress">Total: {{total}}</span>
        <span class="successes-progress">Successes: {{successes}}</span>
        <span class="skipped-progress" v-show="skipped > 0">Skipped: {{skipped}}</span>
        <span class="failures-progress" v-show="failures > 0">Failures: {{failures}}</span>
      </p>
      <wt-progress
          :total="total"
          :successes="successes"
          :skipped="skipped"
          :failures="failures"
      ></wt-progress>
    </div>
    <!-- /.progress -->

    <div class="actions">
      <i-button size="large" :type="color" @click.native="close" :disabled="!finished">OK</i-button>
    </div>
    <!-- /.actions -->
  </wt-modal>
</template>
