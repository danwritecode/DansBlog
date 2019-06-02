<template>
  <div class="contact">
  <br>
    <div id="contact">
      <h1>CONTACT ME</h1>
      <h5>Email: dnelson4993@gmail.com</h5>
      <h5>Twitter: danatdev</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contact',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contact {
  margin: 0 0 0 20px;
  text-align: left;
}

h1, h2, h5 {
  font-weight: normal;
  color: #fff;
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
</style>
