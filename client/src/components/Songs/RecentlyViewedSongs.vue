<template>
  <panel title="Recently Viewed Songs">
    <v-data-table
      :headers="headers"
      :items="histories"
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
import HistoriesService from '@/services/HistoriesService'
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
      histories: [],
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
        this.histories = (await HistoriesService.index()).data
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
