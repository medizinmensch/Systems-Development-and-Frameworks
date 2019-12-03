import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo';
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false;

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  headers: authIsSet()
  // headers: {
    // Authorization: `${localStorage.getItem("auth-token")}` ?
  // }
});

function authIsSet() {
  let token = `${localStorage.getItem("auth-token")}`
  console.log(token)
  if (token != "null") {
    console.log("appears to be not null")
    return {
      Authorization: `${localStorage.getItem("auth-token")}`
    }
  }
  else {
    return null
  }
}


const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});


Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App)
});
