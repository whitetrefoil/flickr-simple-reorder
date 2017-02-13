<style lang="sass" src="./page.sass" scoped></style>
<script lang="ts" src="./page.ts"></script>

<template lang="pug">
  .page.about-page.container
    header.row.page-header
      h1.col-12(@wheel="test") Scrolled {{scrollCount}} lines.
</template>
