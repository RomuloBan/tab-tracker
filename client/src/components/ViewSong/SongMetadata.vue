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
        <v-btn
          v-if="isUserLoggedIn && !bookmark"
          class="cyan"
          dark
          @click="setAsBookmark"
         >
          Set As Bookmark
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn && bookmark"
          class="cyan"
          dark
          @click="unsetAsBookmark"
         >
          Unset As Bookmark
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
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async song () {
       if(!this.isUserLoggedIn) {
        return
      }
      try {
        const bookmarks = (await BookmarksService.index({
          songId: this.song.id,
          userId: this.user.id
        })).data
        if(bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
      } catch (err) {
        console.log("Error trying to get bookmarks")
      }
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id,
          userId: this.user.id
        })).data
      } catch (err) {
        console.log("Error trying to add a bookmark")
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log("Error trying to remove a bookmark")
      }
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
