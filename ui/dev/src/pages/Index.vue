<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-page-container>
      <q-page class="flex flex-center">
        <section class="hero">
          <div class="donate"><a :href="donateUrl" target="_blank" title="Donate"><i class="fas fa-heart" style="color: red"></i></a></div>
          <div class="text-h1 project-name">{{ title }}</div>
          <div class="text-h2 project-tagline">{{ tagline }}</div>
          <a href="#/docs" rel="noopener" class="doc-link">Docs</a>
          <a href="https://octo.a2insights.com.br" target="_blank" rel="noopener" class="doc-link">Octo <q-icon name="open_in_new"></q-icon></a>
          <a :href="locationUrl" target="_blank" rel="noopener" class="doc-link">GitHub <q-icon name="open_in_new"></q-icon></a>
          <a :href="demoUrl" target="_blank" rel="noopener" class="doc-link">Demo <q-icon name="open_in_new"></q-icon></a>
          <div class="row justify-evenly items-center q-ma-sm">
            <div class="project-description" v-html="appDesc"></div>
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
      demoUrl: 'https://www.octo.app.a2insights.com.br'
    }
  }
}
</script>
