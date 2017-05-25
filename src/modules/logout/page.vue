<style lang="less" src="./page.less" scoped></style>
<script lang="ts" src="./page.ts"></script>

<template>
  <div class="page logout-page">
    <wt-panel v-if="hasLoggedOut" title="See you!" color="success">
      <p>You've logged out successfully :)</p>
      <p>Want to login again?</p>
      <p><router-link :to="{name: 'login'}">Go to login page!</router-link></p>
    </wt-panel>

    <wt-panel v-else title="Warning" color="warning">
      <p>You are going to logout, are you sure?</p>
      <p class="actions"><wt-button @click.native="logout()" color="warning">Yes, log me out!</wt-button></p>
    </wt-panel>
  </div>
</template>
