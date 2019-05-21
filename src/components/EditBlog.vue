<template>
  <div>
    <form id="blogSubmitForm">
      <fieldset>
        <div class="form-group">
          <h4>BLOG TITLE</h4>
          <input v-model="form.Title_Tx" class="form-control" placeholder="Enter the blog title...">
        </div>
        <div class="form-group">
          <h4>BLOG ABSTRACT</h4>
          <input v-model="form.Abstract_Tx" class="form-control" placeholder="Enter blog abstract...">
        </div>
        <div class="form-group">
          <H4>BLOG BODY</H4>
          <textarea v-model="form.Body_Tx" class="form-control" id="exampleTextarea" rows="3" style="margin-top: 0px; margin-bottom: 0px; height: 184px;"></textarea>
        </div>
        <div class="form-group">
          <h4>DOCUMENT STATE</h4>
            <div class="form-group">
              <select v-model="form.State_Tx" class="custom-select">
                <option disabled value>Select document state</option>
                <option>Draft</option>
                <option>Live</option>
              </select>
            </div>
        </div>
        <router-link :to="{ name: 'blogpost', params: { id: form.Blog_Id} }">
          <button @click="showPreview" class="modifyButtons btn btn-secondary">PREVIEW</button>
        </router-link>
        <button @click="onSubmit" type="submit" class="modifyButtons btn btn-secondary">Update</button>
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
                        <p>Blog ID: {{form.Blog_Id}}</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" @click="deletePost(); showModal = false" class="btn btn-primary">DELETE POST</button>
                        <button type="button" @click="showModal = false" class="btn btn-secondary" data-dismiss="modal">NEVERMIND</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
      </fieldset>
    </form>
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
    data() {
      return {
        form: {
          Blog_Id:'',
          Title_Tx: '',
          Abstract_Tx: '',
          Body_Tx: '',
          State_Tx: ''
        },
        show: true,
        jwtToken: null,
        postStatus: null,
        postMessage: null,
        userSession: null,
        showModal: false
      }
    },
    methods: {
      navigate() {
        router.go(-1);
      },
      onSubmit(evt) {
        evt.preventDefault()
        const config = {
          headers: {
            authorization: this.jwtToken
          }
        }
        axios.post("https://w1k14u6tm8.execute-api.us-east-2.amazonaws.com/Dev/updateblogpost",JSON.stringify(this.form),config)
        .then(response => (this.postMessage = response.data, this.postStatus = "Success"))
        .catch(error => (this.postMessage = error.data, this.postStatus = "Error"))
      },
      //Even though we're just showing a preview, we need to save the state of the post when the button is clicked
      showPreview() {
        this.form.State_Tx = 'Draft'
        const config = {
          headers: {
            authorization: this.jwtToken
          }
        }
        axios.post("https://w1k14u6tm8.execute-api.us-east-2.amazonaws.com/Dev/updateblogpost",JSON.stringify(this.form),config)
        .then(response => (this.postMessage = response.data, this.postStatus = "Success"))
        .catch(error => (this.postMessage = error.data, this.postStatus = "Error"))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.Title_Tx = ''
        this.form.Abstract_Tx = ''
        this.form.Body_Tx = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      deletePost() {
        const postBody = '{"Blog_Id":' + '"' + this.form.Blog_Id + '"}';
        const config = {
            headers: {
              authorization: this.jwtToken
            }
          }
        axios.post("https://w1k14u6tm8.execute-api.us-east-2.amazonaws.com/Dev/deleteblogpost",postBody,config)
        .then(response => (this.postMessage = response.data, this.postStatus = "Success"))
        .catch(error => (this.postMessage = error.data, this.postStatus = "Error"))
      }
    },
    mounted() {
        Auth.currentSession()
          .then(data => (this.userSession = data, this.jwtToken = data.idToken.jwtToken))
          .catch(err => console.log(err))
      },
    created() {
    this.id = this.$route.params.id;
    this.form.Blog_Id = this.$route.params.id;
    axios
      .get('https://w1k14u6tm8.execute-api.us-east-2.amazonaws.com/Dev/getblogpostbyid?Blog_Id='+this.id)
      .then(response => (this.form.Title_Tx = response.data.Title_Tx, 
                          this.form.Body_Tx = response.data.Body_Tx,
                          this.form.Abstract_Tx = response.data.Abstract_Tx,
                          this.form.State_Tx = response.data.State_Tx))
      .then(this.loading = false)
      .catch(error => console.log(error))
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
  margin: 10px 10px 10px 0;
}

#blogSubmitForm {
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}

h1, h2, h4 {
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
