<template>
  <panel title="Song Metadata">
    <v-layout>
      <v-flex sx6>
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
          class="cyan"
          dark
          :to="{
            name: 'edit-song',
            params() {
              return {
                songId: song.id
              }
            }
          }">
          Edit
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <img class="album-image" :src="song.albumImage" />
        <br/>
        {{song.album}}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>

export default {
  props: [
    'song'
  ]
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
