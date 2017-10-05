<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :items="bookmarks"
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template slot="items" scope="props">
        <td  class="text-xs-right">{{ props.item.title }}</td>
        <td  class="text-xs-right">{{ props.item.artist }}</td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      bookmarks: [],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if(this.isUserLoggedIn) {
      try {
        this.bookmarks = (await BookmarksService.index({
          userId: this.user.id
        })).data
      } catch(err) {
        console.log(err)
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
