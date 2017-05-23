<style lang="less" src="./page.less" scoped></style>
<script lang="ts" src="./page.ts"></script>

<template>
  <div class="page logout-page container">
    <div class="col-12 col-md-8 push-md-2">
      <section class="card card-outline-success" v-if="hasLoggedOut">
        <div class="card-block">
          <p class="card-text">You've logged out successfully, See you again :)</p>
          <p class="card-text">Want to login again?</p>
          <router-link :to="{name: 'login'}" class="btn btn-warning">Go to login page!</router-link>
        </div>
      </section>

      <section class="card card-outline-warning" v-else>
        <div class="card-block">
          <h3 class="card-title">Warning</h3>
          <p class="card-text">You are going to logout, are you sure?</p>
          <a href="javascript:" class="btn btn-warning" @click="logout()">Yes, log me out!</a>
        </div>
      </section>
    </div>
  </div>
</template>
