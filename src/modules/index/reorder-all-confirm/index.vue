<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <wt-modal title="Confirm" size="tiny" color="warning" :is-showing="isShowing">
    <p>Are you sure you want to re-order <strong>{{this.total}}</strong> photosets?</p>
    <div class="actions">
      <i-button size="large" type="warning" @click.native="confirm">Confirm</i-button>
      <i-button size="large" @click.native="cancel">Cancel</i-button>
      <i-button class="right-btn" size="large" type="dashed" @click.native="oneByOne">1 by 1</i-button>
    </div>
  </wt-modal>
</template>
