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
        <div v-html="compiledMarkdown"></div>
      </div>
      <router-link :to="{ name: 'editblog', params: { id: id } }">
        <button type="button" v-if="userSession!=null" class="modifyButtons btn btn-secondary">EDIT POST</button>
      </router-link>
      <button v-if="userSession!=null" @click="showModal = true" class="modifyButtons btn btn-secondary">DELETE POST</button>
      <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Are you sure you want to delete?</h5>
                    <button type="button" @click="showModal = false" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>Deleting this will delete the post forever. Are you sure you want to delete?</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" @click="deletePost" class="btn btn-primary">DELETE POST</button>
                    <button type="button" @click="showModal = false" class="btn btn-secondary" data-dismiss="modal">NEVERMIND</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    <br>
    <div class="alert alert-dismissible alert-success" v-if="postStatus === 'Success'">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <div>{{postStatus}}</div>
      <div>{{postMessage}}</div>
    </div>
    <div class="alert alert-dismissible alert-danger" v-if="postStatus === 'Error'">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <div>{{postStatus}}</div>
      <div>{{postMessage}}</div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'blogPost',
  data () {
    return {
      id: 0,
      blogData: null,
      loading: true,
      userSession: null,
      showModal: false,
      jwtToken: null,
      postStatus: null,
      postMessage: null
    }
  },
  mounted() {
    Auth.currentSession()
      .then(data => (this.userSession = data, this.jwtToken = data.idToken.jwtToken))
      .catch(err => console.log(err))
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.blogData.Body_Tx, { sanitize: true })
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
    },
    deletePost() {
      const postBody = '{"Blog_Id":' + '"' + this.id + '"}';
      const config = {
          headers: {
            authorization: this.jwtToken
          }
        }
      axios.post("https://w1k14u6tm8.execute-api.us-east-2.amazonaws.com/Dev/deleteblogpost",postBody,config)
      .then(response => (this.postMessage = response.data, this.postStatus = "Success"))
      .catch(error => (this.postMessage = error.data, this.postStatus = "Error"))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-body {
  color: #1a1a1a
}

.modal-title {
  color: #1a1a1a
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modifyButtons {
  margin: 20px 20px 20px 0;
}

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

h1, h2, h3, h4, h5, h6 {
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

.markdown-body .highlight pre, .markdown-body pre {
    background-color: #eaedf1;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
}

</style>
