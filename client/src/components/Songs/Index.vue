<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <search-panel />
      <songs-panel :songs="songs" class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongsPanel from './SongsPanel'
import SearchPanel from './SongsSearchPanel'
export default {
  data () {
    return {
      songs: {}
    }
  },
  components: {
    SongsPanel,
    SearchPanel
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (search) {
        this.songs = (await SongsService.index(search)).data
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
