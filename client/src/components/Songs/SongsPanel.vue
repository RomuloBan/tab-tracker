<template>
  <panel title="Songs">
    <v-btn
    fab
    class="cyan accent-3"
    slot="action"
    small
    absolute
    @click="navigateTo({name: 'create-song'})"
    right>
      <v-icon
      >add</v-icon>
    </v-btn>
    <div
      v-for="song in songs"
      class="song"
      :key="song.id">
      <v-layout mb-4>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
          <div class="song-artist">
            {{song.artist}}
          </div>
          <div class="song-genre">
            {{song.genre}}
          </div>

          <v-btn
            dark
            class="cyan"
            @click="navigateTo({
              name: 'song',
              params: {
                songId: song.id
              }
            })">
            View
          </v-btn>

        </v-flex>
          <v-flex xs6>
            <img class="album-image" :src="song.albumImage">
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  props: [
    'songs'
  ],
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 1.1rem;
}
.song-artist {
  font-size: 1rem;
}
.song-genre {
  font-size: 0.9rem;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
