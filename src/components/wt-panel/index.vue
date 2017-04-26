<style lang="sass" src="./index.sass" scoped></style>
<script lang="ts" src="./index.ts"></script>

<template>
  <section class="wt-panel card" :class="cardClass">
    <div class="card-block"><h4 class="card-title" :class="titleClass">{{title}}</h4>
      <p class="card-text">
        <slot></slot>
      </p>
    </div>
  </section>
</template>
