<template>
  <div class="blog">
      <div class="spinnerLoadingAdjust" v-if="loading">
        <div class="spinner-border m-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="container-fluid mt-4" v-else>
          <div class="row justify-content-center">
              <div class="col-auto mb-3" v-bind:key=item.Blog_Id v-for="item in filteredBlogData">
                <div id="blogCard" class="card bg-secondary mb-3" style="max-width: 18rem; max-height: 18rem;">
                  <div class="card-body">
                    <h4 class="card-title">{{item.Title_Tx}}</h4>
                    <h6 id="createdOnHeader" class="card-subtitle text-muted">{{item.CreatedOn}}</h6>
                    <p class="card-text">{{item.Abstract_Tx}}</p>
                    <router-link :to="{ name: 'blogpost', params: { id: item.Blog_Id } }">
                      <button type="button" id="readPostButton" class="btn btn-primary btn-lg btn-block">READ POST</button>
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
      blogData:null,
      loading: true
    }
  },
  created() {
    axios
      .get('https://w1k14u6tm8.execute-api.us-east-2.amazonaws.com/Dev/getallblogposts')
      .then(response => (this.blogData = response.data, this.loading = false))
      .catch(error => alert(error), this.loading = false)
  },
    computed: {
      filteredBlogData() {
        if(!this.blogData) return []; //handle empty array

        return _.orderBy(this.blogData.filter(x => x.State_Tx === 'Live'), 'CreatedOn', 'desc')
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.spinnerLoadingAdjust {
  text-align: center;
  justify-content: center;
  margin-left: 5%;
  color: white;
}

#readPostButton {
  padding: 0.8rem;
}

#blogCard {
  text-align: left;
}

#createdOnHeader {
  margin: 10px 0 10px 0;
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
</style>
