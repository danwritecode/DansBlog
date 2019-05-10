<template>
  <div class="blogPost" id="blogPost">
    <br>
      <div id="spinnerLoading" v-if="loading">
        <b-spinner></b-spinner>
      </div>
      <div v-else>
        <div id="blogHeader">
          <h1>{{ blogData.Title_Tx }}</h1>
          <h6>Published On: {{ blogData.CreatedOn }}</h6>
          <h6>Author: Dan Nelson</h6>
        </div>
        <br>
        <span style="white-space: pre-wrap;">{{ blogData.Body_Tx }}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'blogPost',
  data () {
    return {
      id: 0,
      blogData: null,
      loading: true

    }
  },
  created() {
    this.id = this.$route.params.id;
    axios
      .get('https://w1k14u6tm8.execute-api.us-east-2.amazonaws.com/Dev/getblogpostbyid?Blog_Id='+this.id)
      .then(response => (this.blogData = response.data))
      .then(this.loading = false)
      .catch(error => alert(error))
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#spinnerLoading {
  margin-left: 48%;
  margin-top: 25%;
}

#blogPost {
  margin: 0 2rem 0 2rem;
  text-align: left;
  color: #fff;
}

#blogHeader {
  border-bottom: solid;
  border-width: 1px;
  border-color: #fff;
}

h1, h2, h6 {
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
