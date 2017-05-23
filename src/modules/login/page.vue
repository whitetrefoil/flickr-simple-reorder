<style lang="less" src="./page.less" scoped></style>
<script lang="ts" src="./page.ts"></script>

<template>
  <div class="page login-page">
    <div class="row">
      <div class="col-12 col-md-6 push-md-3">
        <!-- Before login-->
        <wt-panel v-if="status === 0" color="info" title="Redirecting you to Flickr">
          <p class="card-text">If the page doesn't redirect, please <a :href="loginUrl">click here</a> to try again.</p>
        </wt-panel>
        <!-- Requesting token-->
        <wt-panel v-else-if="status === 1" color="info" title="Communicating with Flickr">
          <p class="card-text">Just a second&hellip;</p>
        </wt-panel>
        <!-- Invalid-->
        <wt-panel v-else color="warning" title="Your authentication is invalid">
          <p class="card-text">This may due to your previous authentication is timeout or some other small problem. <a :href="loginUrl">Please click here to login again.</a>
          </p>
        </wt-panel>
      </div>
    </div>
  </div>
</template>
