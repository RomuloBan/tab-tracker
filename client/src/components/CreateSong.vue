<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field
          label="Title"
          v-model="song.title"
          :rules="[rules.required]"
        />

        <v-text-field
          label="Artist"
          v-model="song.artist"
          :rules="[rules.required]"
        />

        <v-text-field
          label="Genre"
          v-model="song.genre"
          :rules="[rules.required]"
        />

        <v-text-field
          label="Album"
          v-model="song.album"
          :rules="[rules.required]"
        />

        <v-text-field
          label="Album Image Url"
          v-model="song.albumImage"
          :rules="[rules.required]"
        />

        <v-text-field
          label="YouTube ID"
          v-model="song.youtubeId"
          :rules="[rules.required]"
        />
      </panel>
    </v-flex>

    <v-flex xs7 offset-xs1>
      <panel title="Song Structure">
        <v-text-field
          label="Tab"
          multi-line
          v-model="song.tab"
          :rules="[rules.required]"
        />

        <v-text-field
          label="Lyrics"
          multi-line
          v-model="song.lyrics"
          :rules="[rules.required]"
        />

      </panel>
      <div
        v-if="error"
        class="danger-alert">
        {{error}}
      </div>
      <v-btn
        dark
        class="cyan"
        @click="create"
      >Create Song</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import  SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      error: null,
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImage: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  components: {
    Panel
  },
  methods: {
    async create () {
      this.error = null
      const isAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
        if(!isAllFieldsFilledIn) {
          this.error = 'Please fill in all the required fields.'
          return
        }
      try {
        await SongsService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.danger-alert {
  color: red;
}
</style>
