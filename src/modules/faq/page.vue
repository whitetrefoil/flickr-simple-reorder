<style lang="less" src="./page.less" scoped></style>
<script lang="ts" src="./page.ts"></script>

<template>
  <article class="wt-page faq-page">
    <header class="wt-page-header">
      <h1 class="hidden-sm-down">Frequently Asked Question</h1>
    </header>

    <div class="wt-page-content">
      <section id="faq-q1">
        <h3>Q1. What is this?</h3>

        <p>This is a tool to help re-ordering the photosets in Flickr.</p>
        <p>I wrote this because Flickr won't order my photosets automatically, it will simply put the photo I just uploaded at the tail of photosets. I've some long term growing photosets like the ones of cameras, lenses or locations. I prefer a "from newest to oldest" order for them.</p>
        <p>This tool will neither do it automatically actually. But it's much easier to do because I won't have to open the photosets one by one. It even have a batch mode which can order all the photosets at once.</p>
      </section>

      <section id="faq-q2">
        <h3>Q2. Why it's so dangerous?</h3>

        <p>The fact is, it's with risk but it isn't such dangerous.</p>
        <p>You may saw my warning message moment ago. It seems to say you can easily erase all your photos by a simple clicking on wrong button. I put that warning there because I want people who just happened to come in to pay attention before using it, not blind.</p>
        <p>To understand how dangerous it is. I need to explain <a href="#faq-q3">what will it do actually</a>.</p>
        <p>Technically, the only WRITE operation this application will do is a simple "orderPhotos" action. It has no such strong capability to erase or change anything for each photo unless something goes terribly wrong.</p>
        <p>The most possible danger you may face is that your photosets may be ordered in how you ain't expecting. Then you have to correct this manually.</p>
      </section>

      <section id="faq-q3">
        <h3>Q3. What will it do actually?</h3>

        <p>It does 3 things to function:</p>
        <p>Firstly direct you to Flickr, then get authentication (ensure you are the owner of that account) and authorization (ensure you authorize this application to read and write your account).</p>
        <p>This shouldn't harm anything except if you breach some terms of Flickr, for example entering a wrong password too many times, you may be banned by Flickr, I guess.</p>
        <p>BTW, another benefit why this application direct you to Flickr to get authentication is in this way we won't have to store your sensitive authentication locally.</p>
        <p>Then this application will get some information from Flickr, like your photosets list, your name and avatar, etc. This is totally safe.</p>
        <p>Once you decide to reorder a photoset, this application will also have to get the information of all photos in that photoset. That's because Flickr won't help us to do the ordering, so this application have to order them locally, then send the new order to Flickr to replace the old order. And this is the only WRITE action this application will operate.</p>
      </section>

      <section id="faq-q4">
        <h3>Q4. Why I can't access it from China Mainland?</h3>

        <p>You can access this application actually. But you may not be able to access the authentication page of Flickr, because of the network condition in China. As above, this application requires the authentication from Flickr.</p>
        <p>This application is a pure web page, which means there's totally no server-side function gets involved. Everything, except the Flickr's parts of course, runs in your browser. You can even download the source code from the project's Github page then deploy it anywhere you like. If you manage to get your browser to access Flickr successfully, you should also be able to use this application as well.</p>
      </section>
    </div>
  </article>
</template>
