<style lang="less" src="./page.less" scoped></style>
<script lang="ts" src="./page.ts"></script>

<template>
  <div class="page login-page">
    <!-- Before login -->
    <wt-panel v-if="status === 0" color="primary" title="Login">
      <p>You need to login to use this application. ;)</p>
      <p><i-button size="large" type="primary" @click="login">Login</i-button></p>
    </wt-panel>

    <!-- Requesting login token -->
    <wt-panel v-else-if="status === 1" color="primary" title="Login">
      <p>Redirecting you to Flickr&hellip;&hellip;</p>
      <p v-show="loginUrl != null">If the page doesn't redirect, please <a :href="loginUrl">click here</a>.</p>
    </wt-panel>

    <!-- Verifying token -->
    <wt-panel v-else-if="status === 2" color="primary" title="Login">
      <p>Verifying the authentication, just hold on a second&hellip;&hellip;</p>
    </wt-panel>

    <!-- Network error -->
    <wt-panel v-else-if="status === -1" color="error" title="Network Error">
      <p>Failed to connect to the server. Please check your network connection.</p>
      <p><i-button size="large" type="error" @click="login">Try Again</i-button></p>
    </wt-panel>

    <!-- Invalid -->
    <wt-panel v-else color="warning" title="Authentication Error">
      <p>Your authentication is invalid. This may due to your previous authentication is timeout or some other small problem.</p>
      <p><i-button size="large" type="warning" @click="login">Try Again</i-button></p>
    </wt-panel>
  </div>
</template>
