import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';
import { CHECKOUT, ADD_PRODUCT_TO_CART } from './mutation-type';

Vue.filter('currency', function(value) {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    
    return formatter.format(value);
});

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueRouter);

const store = new Vuex.Store({
    state: {
        cart: {
            items: []
        }
    },
    getters: {
        cartTotal: (state) => {
            let total = 0;
            state.cart.items.forEach(function (item) {
                total += item.product.price * item.quantity;
            });

            return total;
        },
        taxAmount: (state, getters) => (percentage) => {
            return ((getters.cartTotal * percentage) / 100);
        },
        getCartItem: (state) => (product) => {
            for (let i = 0; i < state.cart.items.length; i++) {
                if (state.cart.items[i].product.id === product.id) {
                    return state.cart.items[i];
                }
            }

            return null;
        }
    },
    mutations: {
        checkout: (state) => {
            if (confirm("Are you sure want to checkout")) {
                state.cart.items.forEach(function (item) {
                    item.product.inStock += item.quantity;
                });

                state.cart.items = [];
            }
        },
        addProductToCart: (state, payload) => {
            if (payload.cartItem != null) {
                payload.cartItem.quantity += payload.quantity;
            } else {
                state.cart.items.push({
                    product: payload.product,
                    quantity: payload.quantity
                });
            }

            payload.product.inStock -= payload.quantity;
            //this.cartTotal += product.price * quantity;
        },
    },
    actions: {
        [ADD_PRODUCT_TO_CART] ({ commit, getters }, payload) {
            payload.cartItem = getters.getCartItem(payload.product);
            commit(ADD_PRODUCT_TO_CART, payload);
        }
    }
});

const router = new VueRouter({
    routes: routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            };
        }
        
        if (savedPosition) {
            return savedPosition;
        }
        
        return { x: 0, y: 0 };
    }
});

Vue.http.options.root = 'http://localhost:3000';

new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    store: store
});
