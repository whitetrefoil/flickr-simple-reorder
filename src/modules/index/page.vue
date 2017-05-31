<style lang="less" src="./page.less" scoped></style>
<script lang="ts" src="./page.ts"></script>

<template>
  <div class="page index-page">
    <div class="welcome" v-if="!hasLoggedIn">
      <wt-panel color="warning" title="Warning!">
        <p>This application is still under development.</p>
        <p>It contains a lot of bugs, errors, incomplete features, bad things.  And it functions very unstable.  This means it will possibly <strong>mess up, damage or even totally destroy your data</strong>.</p>
        <p>Please:</p>
        <ol>
          <li>Do <strong>backup</strong> your data before using.</li>
          <li>Do <strong>NOT</strong> use it on important data or even accounts.</li>
          <li>Use this application at your own risk.</li>
        </ol>
        <p>Although I will not take any responsibility for your loss
          (but I really don't want to see this happen, and hopefully you have followed the recommendations above), <a href="https://github.com/whitetrefoil/flickr-simple-reorder/issues" target="_blank">any bug report is appreciated</a>.</p>
        <p>Starting to use this application is deemed to read, acknowledge and agree with these terms.</p>
        <p>If you really want to take a try, <router-link :to="{name: 'login'}">click here to login with flickr</router-link>.</p>
        <p>You can also <router-link :to="{name: 'faq'}">checkout the FAQ for more information</router-link>.</p>
      </wt-panel>
    </div>
    <!-- /.welcome -->

    <div class="loading" v-else-if="isLoading">
      <wt-panel color="info" title="Loading">
        <p>Loading photosets information from Flickr&hellip;&hellip;</p>
      </wt-panel>
    </div>
    <!-- /.loading -->

    <div class="photosets-page" v-else>
      <div class="toolbar">
        <span>Order by</span>
        <i-select size="large" :value="$store.state.photosets.preferences.orderBy" @on-change="onOrderByChange">
          <i-option v-for="(display, key) in orderByOptions" :key="key" :value="key" :label="display"></i-option>
        </i-select>

        <span>Desc?</span>
        <i-switch :value="$store.state.photosets.preferences.isDesc" @on-change="onIsDescChange"></i-switch>

        <wt-button color="primary">Reorder All</wt-button>
      </div>
      <!-- /.toolbar -->

      <div class="photosets">
        <wt-photoset v-for="photoset in photosets" :key="photoset.id" :photoset="photoset"></wt-photoset>
      </div>
      <!-- /.photosets -->
    </div>
    <!-- /.photosets-page -->
  </div>
</template>
