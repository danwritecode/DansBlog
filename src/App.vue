<template>
  <div id="app">
    <nav id="header" class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" to="/home" href="#">
        <img id="navLogo" src="./assets/dan@dev-logo-B-LogoOnly.png" width="40" heigh="40" alt="">
        DAN@DEV</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/home">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link  class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/blog">BLOG</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/missionstatement">MY MISSION</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/contact">CONTACT</router-link>
          </li>
          <li class="nav-item">
            <div v-if="userSession!=null">
              <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/writeblog">WRITE NEW BLOG</router-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  <router-view></router-view>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'App',
  data() {
    return {
      userSession: null
    }
  },
  mounted() {
    Auth.currentSession()
      .then(data => (this.userSession = data))
      .catch(err => console.log(err))
  }
}
</script>

<style>
#app {
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#navbarBranding {
  max-width: 40px;
  margin-right: 10px;
}

#navLogo {
  margin-right: 10px;
}

</style>
