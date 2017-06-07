<style lang="less" src="./index.less" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <nav class="wt-main-nav">
    <div class="app-title">
      <router-link :to="{name: 'index'}">Flickr Simple Reorder</router-link>
    </div>
    <!-- /.app-title -->

    <div class="menu-items">
      <router-link :to="{name: 'index'}" exact>Photosets</router-link>
      <router-link :to="{name: 'faq'}">FAQ</router-link>
      <router-link :to="{name: 'about'}">About</router-link>
      <router-link :to="{name: 'logout'}" v-if="hasLoggedIn">Logout</router-link>
      <router-link :to="{name: 'login'}" v-else>Login</router-link>
    </div>

    <div class="user-greeting" v-show="hasLoggedIn">
      <span>Hello, {{userName || 'guest'}}!</span>

      <a :href="profileUrl" target="_blank"><img class="user-avatar" :src="userAvatarUrl" :alt="userName"></a>

    </div>
  </nav>
</template>
