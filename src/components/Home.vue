<template>
  <div>
    <div id="homePage" class="home">
      <img id="homeLogo" src="../assets/dan@dev-logo-B-LogoOnly.png" alt="Dan likes wolves, so this is Dan's logo.">
    </div>
    <div id="typewriter">
      <h5>All ideas should operate within the physical constraints of our universe.</h5>
      <h5 id="typeWriterAnimate">That is the only constraint.<span>|</span></h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

img {
  max-width: 85%;
  transition: 2s;
}

/* img:hover {
  filter: blur(8px);
  -webkit-filter: blur(8px)
} */

#typewriter {
  margin: 50px 30px 0 30px;
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
    img {
    max-width: 90%;
  }

  #typewriter {
    margin: 100px 30px 0 30px;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  img {
    max-width: 95%;
  }
  #typewriter {
    margin: 100px 30px 0 30px;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  img {
    max-width: 100%;
  }

  #typewriter {
    margin: 100px 30px 0 30px;
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  img {
    max-width: 100%;
  }

  #typewriter {
    margin: 100px 30px 0 30px;
  }
}

#homeHeader {
  color: white;
}


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#typewriter h5 {
  color: white;
  font-weight: 700;
  text-align: left;
}

#typeWriterAnimate {
  white-space: nowrap;
  overflow: hidden;
  width: 30em;
  animation: type 6s steps(60, end);
  max-width: 30em;
}

span{
  animation: blink 1s infinite;
}

@keyframes type{ 
  from { width: 0; } 
} 


@keyframes blink{
  to{opacity: .0;}
}

</style>
