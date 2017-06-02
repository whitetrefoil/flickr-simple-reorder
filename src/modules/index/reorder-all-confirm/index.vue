<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <wt-modal title="Confirm" size="tiny" color="warning" :is-showing="isShowing">
    <p>Are you sure you want to re-order <strong>{{this.total}}</strong> photosets?</p>
    <div class="actions">
      <wt-button color="warning" @click.native="confirm">Confirm</wt-button>
      <wt-button color="secondary" @click.native="cancel">Cancel</wt-button>
    </div>
  </wt-modal>
</template>
