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
        <button @click="onSubmit" type="submit" class="btn btn-secondary">Submit</button>
      </fieldset>
    </form>
  </div>
</template>


<script>
import { Auth } from 'aws-amplify'

  export default {
    data() {
      return {
        form: {
          Title_Tx: '',
          Abstract_Tx: '',
          Body_Tx: ''
        },
        show: true,
        jwtToken: null
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        const config = {
          headers: {
            authorization: this.jwtToken
          }
        }
        axios.post("https://w1k14u6tm8.execute-api.us-east-2.amazonaws.com/Dev/createblogpost",JSON.stringify(this.form),config)
        .then(function(response) {
          alert(response);
        })
        .catch(function(error) {
          alert(error);
        })
        //alert(JSON.stringify(this.form))
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
      }
    },
    mounted() {
        Auth.currentSession()
          .then(data => (this.jwtToken = data.idToken.jwtToken))
          .catch(err => console.log(err))
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
