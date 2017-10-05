<template>
  <div>
  <v-layout>
    <v-flex md5>
      <song-metadata :song="song" />
    </v-flex>
    <v-flex md6 offset-md1>
      <you-tube :youtubeId="song.youtubeId" />
    </v-flex>
  </v-layout>
  <v-layout mt-4>
    <v-flex md5>
      <song-textarea title="Tabs" :text="song.tab" />
    </v-flex>
    <v-flex md6 offset-md1>
      <song-textarea title="Lyrics" :text="song.lyrics" />
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongMetadata from './SongMetadata'
import SongTextarea from './SongTextarea'
import YouTube from './YouTube'
import {mapState} from 'vuex'
import HistoriesService from '@/services/HistoriesService'
export default {
  data () {
    return {
      song: {}
    }
  },
  components: {
    SongMetadata,
    SongTextarea,
    YouTube
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  async mounted () {
    try {
      const songId = this.route.params.songId
      this.song = (await SongsService.show(songId)).data;
      if(this.isUserLoggedIn) {
        HistoriesService.post({
          songId: songId,
          userId: this.user.id
        })
      }
    } catch(err) {
      console.log('Error trying to find the song.')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
