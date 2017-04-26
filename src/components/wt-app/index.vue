<style lang="sass" src="./index.sass" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <div class="wt-app">
    <wt-main-nav></wt-main-nav>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
