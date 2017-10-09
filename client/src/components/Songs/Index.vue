<template>
  <v-layout>
    <v-flex xs6 v-if="isUserLoggedIn">
      <songs-bookmarks />
      <recently-viewed-songs />
    </v-flex>
    <v-flex :class="{
      xs6: isUserLoggedIn,
      xs12: !isUserLoggedIn
    }" class="ml-2">
      <search-panel />
      <songs-panel :songs="songs" class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import SongsService from '@/services/SongsService'
import SongsPanel from './SongsPanel'
import SongsBookmarks from './SongsBookmarks'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import SearchPanel from './SongsSearchPanel'
export default {
  data () {
    return {
      songs: {}
    }
  },
  components: {
    SongsPanel,
    SearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
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
