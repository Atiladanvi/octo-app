<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-page-container>
      <q-page class="flex flex-center">
        <section class="hero">
          <div class="donate"><a :href="donateUrl" target="_blank" title="Donate"><i class="fas fa-heart" style="color: red"></i></a></div>
          <div class="text-h1 project-name">{{ title }}</div>
          <div class="text-h2 project-tagline">{{ tagline }}</div>
          <q-btn type="a" target="_blank" href="https://octo.a2insights.com.br" class="btn" label="Octo" no-caps flat/>
          <q-btn type="a" :href="locationUrl" target="_blank" class="btn" label="View on GitHub" no-caps flat/>
          <q-btn to="/docs" class="btn" label="Docs" no-caps flat/>
          <q-btn type="a" target="_blank" :href="demoUrl" class="btn" label="Demo" no-caps flat/>
          <q-btn type="a" :href="donateUrl" target="_blank" class="btn" label="Donate" no-caps flat/>
          <div class="row justify-evenly items-center q-ma-sm">
            <div class="octo" v-html="appDesc"></div>
            <div class="byline">{{ byline }} <a :href="bylineTwitter" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a></div>
          </div>
        </section>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      title: 'OctoApp',
      tagline: 'This project is created to help other web developers create a app in an easy way.',
      byline: 'Atila Silva',
      bylineTwitter: 'https://twitter.com/Atiladanvi',
      appDesc: 'Demo is also linked to a <a target="_blank" href="https://github.com/a2insights/octo">Laravel API project</a> that shows how this frontend can be integrated to an API.',
      locationUrl: 'https://github.com/a2insights/octo-app',
      donateUrl: 'https://github.com/sponsors/a2insights',
      docsUrl: 'https://www.octo.docs.a2insights.com.br',
      demoUrl: 'https://www.octo.app.a2insights.com.br',
    }
  }
}
</script>
