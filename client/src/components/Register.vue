<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              label="Email"
              v-model="email"
            />
            <br>
            <v-text-field
              name="input-10-1"
              label="Password"
              v-model="password"
              :append-icon="el ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => {el =!el}"
              :type="el ? 'password' : 'text'"
            />
            <br>
            <div class="error-register" v-html="error"></div>
            <br>
            <v-btn
            dark
            class="cyan"
            @click="register"
            >Register</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      el: false,
      password: '',
      email: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error-register {
    color: red;
  }
</style>
