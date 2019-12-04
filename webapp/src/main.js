import {ApolloClient} from 'apollo-client'
import {ApolloLink} from 'apollo-link'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo';
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import {setContext} from "apollo-link-context";
import {AUTH_TOKEN} from './constants/settings.js'

Vue.config.productionTip = false;

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, {headers, ...context}) => {
    const token = localStorage.getItem(AUTH_TOKEN);

    return {
        headers: {
            ...headers,
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
        },
        ...context,
    };
});

const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
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
