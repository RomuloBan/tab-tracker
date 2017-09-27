<template>
  <v-toolbar fixed dark class="cyan">
    <v-toolbar-title class="mr-4">
      <router-link
        tag="span"
        class="home"
        :to="{ name: 'root'}"
      >
        TabTracker
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        flat
        :to="{name: 'songs'}">
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        :to="{ name: 'register'}">
        Sign Up
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        :to="{ name: 'login'}">
        Login
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        @click="logout()">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    cursor: pointer;
  }
  .home:hover {
    color: #E9E;
  }
</style>
