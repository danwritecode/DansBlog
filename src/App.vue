<template>
  <div id="app">
    <nav id="header" class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" to="/home" href="#">
        <img id="navLogo" src="./assets/dan@dev-logo-B-LogoOnly.png" width="40" heigh="40" alt="">
        DAN@DEV</a>
      <button @click="isActive = !isActive" class="navbar-toggler hamburger hamburger--collapse" v-bind:class="{'is-active': isActive}" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <!-- <span class="navbar-toggler-icon"></span> -->
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li @click="isActive = !isActive" class="nav-item">
            <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/home">HOME</router-link>
          </li>
          <li @click="isActive = !isActive" class="nav-item">
            <router-link  class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/blog">BLOG</router-link>
          </li>
          <li @click="isActive = !isActive" class="nav-item">
            <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/missionstatement">MY MISSION</router-link>
          </li>
          <li @click="isActive = !isActive" class="nav-item">
            <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/contact">CONTACT</router-link>
          </li>
          <li @click="isActive = !isActive" class="nav-item">
            <div v-if="userSession!=null">
              <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/writeblog">WRITE NEW BLOG</router-link>
            </div>
          </li>
          <li @click="isActive = !isActive" class="nav-item">
            <div v-if="userSession!=null">
              <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/drafts">EDIT DRAFTS</router-link>
            </div>
          </li>
          <li @click="isActive = !isActive" class="nav-item">
            <div v-if="userSession!=null">
              <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/login">LOGOUT</router-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'App',
  data() {
    return {
      userSession: null,
      isActive: false
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

.hamburger {
  padding: 15px 15px;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible; }
  .hamburger:hover {
    opacity: 0.7; }
  .hamburger.is-active:hover {
    opacity: 0.7; }
  .hamburger.is-active .hamburger-inner,
  .hamburger.is-active .hamburger-inner::before,
  .hamburger.is-active .hamburger-inner::after {
    background-color: #9c9c9c; }

.hamburger-box {
  width: 36px;
  height: 16px;
  display: inline-block;
  position: relative; }

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px; }
  .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {
    width: 32px;
    height: 2px;
    background-color: #9c9c9c;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease; }
  .hamburger-inner::before, .hamburger-inner::after {
    content: "";
    display: block; }
  .hamburger-inner::before {
    top: -10px; }
  .hamburger-inner::after {
    bottom: -10px; }

.hamburger--collapse .hamburger-inner {
  top: auto;
  bottom: 0;
  transition-duration: 0.13s;
  transition-delay: 0.13s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }
  .hamburger--collapse .hamburger-inner::after {
    top: -20px;
    transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1), opacity 0.1s linear; }
  .hamburger--collapse .hamburger-inner::before {
    transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1), transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19); }

.hamburger--collapse.is-active .hamburger-inner {
  transform: translate3d(0, -10px, 0) rotate(-45deg);
  transition-delay: 0.22s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
  .hamburger--collapse.is-active .hamburger-inner::after {
    top: 0;
    opacity: 0;
    transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333), opacity 0.1s 0.22s linear; }
  .hamburger--collapse.is-active .hamburger-inner::before {
    top: 0;
    transform: rotate(-90deg);
    transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333), transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1); }

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

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
