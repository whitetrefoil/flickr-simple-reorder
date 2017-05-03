<style lang="sass" src="./index.sass" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <nav class="wt-main-nav navbar navbar-toggleable-sm navbar-inverse bg-inverse">
    <button class="navbar-toggler navbar-toggler-left" type="button">
      <span class="navbar-toggler-icon" @click="toggleMenu()"></span>
    </button>

    <router-link class="navbar-brand mx-sm-auto mx-auto" :to="{name: 'index'}">Flickr Simple Reorder</router-link>

    <div ref="menu" class="navbar-collapse collapse" @transitionend="menuTransitionEnd()">
      <ul class="navbar-nav">
        <router-link class="nav-item" tag="li" active-class="active" :to="{name: 'index'}" exact><a class="nav-link">Photosets</a></router-link>
        <router-link class="nav-item" tag="li" active-class="active" :to="{name: 'faq'}"><a class="nav-link">FAQ</a></router-link>
        <router-link class="nav-item" tag="li" active-class="active" :to="{name: 'about'}"><a class="nav-link">About</a></router-link>
        <router-link class="nav-item" tag="li" active-class="active" :to="{name: 'logout'}" v-if="hasLoggedIn"><a class="nav-link">Logout</a></router-link>
        <router-link class="nav-item" tag="li" active-class="active" :to="{name: 'login'}" v-else><a class="nav-link">Login</a></router-link>
      </ul>
    </div>

    <div class="user-greeting" v-show="userName">
      <div class="navbar-text hidden-sm-down">
        <span>Hello, {{userName}}!</span>
      </div>

      <img class="user-avatar" :src="userAvatarUrl" :alt="userName">
    </div>
  </nav>
</template>
