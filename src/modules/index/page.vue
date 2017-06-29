<style lang="less" src="./page.less" scoped></style>
<script lang="ts" src="./page.ts"></script>

<template>
  <div class="page index-page">
    <div class="welcome" v-if="!hasLoggedIn">
      <wt-panel color="warning" title="Warning!">
        <p>This application is still under development.</p>
        <p>It contains a lot of bugs, errors, incomplete features, bad things.  And it functions very unstable.  This means it will possibly <strong>mess up, damage or even totally destroy your data</strong>.
        </p>
        <p>Please:</p>
        <ol>
          <li>Do <strong>backup</strong> your data before using.</li>
          <li>Do <strong>NOT</strong> use it on important data or even accounts.</li>
          <li>Use this application at your own risk.</li>
        </ol>
        <p>Although I will not take any responsibility for your loss
          (but I really don't want to see this happen, and hopefully you have followed the recommendations above), <a href="https://github.com/whitetrefoil/flickr-simple-reorder/issues" target="_blank">any bug report is appreciated</a>.
        </p>
        <p>Starting to use this application is deemed to read, acknowledge and agree with these terms.</p>
        <p>If you really want to take a try,
          <router-link :to="{name: 'login'}">click here to login with flickr</router-link>
          .
        </p>
        <p>You can also
          <router-link :to="{name: 'faq'}">checkout the FAQ for more information</router-link>
          .
        </p>
      </wt-panel>
    </div>
    <!-- /.welcome -->

    <div class="loading" v-else-if="status === 'loading'">
      <wt-panel color="primary" title="Loading">
        <p>Loading photosets information from Flickr&hellip;&hellip;</p>
      </wt-panel>
    </div>
    <!-- /.loading -->

    <div class="network-error" v-else-if="status === 'error'">
      <wt-panel color="error" title="Network Error">
        <p>Failed to connect to the server. Please check your network connection.</p>
        <p><i-button size="large" type="error" @click="retry">Try Again</i-button></p>
      </wt-panel>
    </div>
    <!-- /.network-error -->

    <div class="photosets-page" v-else>
      <div class="toolbar">
        <div class="toolbar-section">
          <i-input
              size="large"
              class="search"
              v-model="filter"
              placeholder="Search……"
              icon="search"
              :class="{focus: isSearchFocused || filter.length > 0}"
              @on-focus="onSearchFocus"
              @on-blur="onSearchBlur"
          ></i-input>
        </div>
        <!-- /.toolbar-section -->

        <div class="toolbar-section">
          <span class="toolbar-label">Order by</span>
          <i-select size="large" :value="$store.state.photosets.preferences.orderBy" @on-change="onOrderByChange">
            <i-option v-for="(display, key) in orderByOptions" :key="key" :value="key" :label="display"></i-option>
          </i-select>
        </div>
        <!-- /.toolbar-section -->

        <div class="toolbar-section">
          <span class="toolbar-label">Desc?</span>
          <i-switch :value="$store.state.photosets.preferences.isDesc" @on-change="onIsDescChange"></i-switch>

          <i-button size="large" class="reorder-all" type="primary" @click.native="onReorderAllClick">Reorder All</i-button>
        </div>
        <!-- /.toolbar-section -->
      </div>
      <!-- /.toolbar -->

      <div class="photosets">
        <wt-photoset v-for="photoset in filteredSets" :key="photoset.id" :photoset="photoset"></wt-photoset>
      </div>
      <!-- /.photosets -->
    </div>
    <!-- /.photosets-page -->

    <reorder-all-confirm
        :is-showing="isConfirming"
        :total="totalPhotosets"
        @confirm="confirmed"
        @cancel="canceled"
    ></reorder-all-confirm>
    <reordering-all
        :is-showing="isReorderingAll"
        :total="totalPhotosets"
        :successes="reorderingAllStatus.successes"
        :skipped="reorderingAllStatus.skipped"
        :failures="reorderingAllStatus.failures"
        @close="closed"
    ></reordering-all>
  </div>
</template>
