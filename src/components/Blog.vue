<template>
  <div class="blog">
      <div class="container-fluid mt-4">
          <div class="row justify-content-center">
              <div class="col-auto mb-3" v-bind:key=item.Blog_Id v-for="item in filteredBlogData">
                <div class="card bg-secondary mb-3" style="max-width: 18rem; max-height: 18rem;">
                  <div class="card-body">
                    <h4 class="card-title">{{item.Title_Tx}}</h4>
                    <p class="card-text">{{item.Abstract_Tx}}</p>
                    <router-link :to="{ name: 'blogpost', params: { id: item.Blog_Id } }">
                      <button type="button" class="btn btn-primary btn-lg btn-block">READ POST</button>
                    </router-link>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'blog',
  data () {
    return {
      blogData:null
    }
  },
    mounted() {
      axios
        .get('https://w1k14u6tm8.execute-api.us-east-2.amazonaws.com/Dev/getallblogposts')
        .then(response => (this.blogData = response.data))
        .catch(error => alert(error))
  },
    computed: {
      filteredBlogData() {
        if(!this.blogData) return []; //handle empty array

        return this.blogData.filter(x => x.Env_Id === 'prod')
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
</style>
