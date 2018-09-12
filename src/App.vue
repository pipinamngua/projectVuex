<template>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <router-link to="/" exact class="navbar-brand"><strong>E-commerce Inc.</strong></router-link>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <router-link to="/" tag="li" exact active-class="active">
                            <a>Products</a>
                        </router-link>

                        <router-link to="/cart" tag="li" active-class="active">
                            <a>Cart</a>
                        </router-link>
                    </ul>

                    <div class="nav navbar-nav navbar-right">
                        <div class="stats">{{ cart.items.length }} <template v-if="cart.items.length == 1">item</template><template v-else>items</template> in cart, totalling {{ cartTotal | currency }}</div>
                    </div>
                </div>
            </div>
        </nav>

        <transition
                enter-active-class="animated fadeInRight"
                leave-active-class="animated fadeOutLeft"
                mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        computed: {
            cart() {
                return this.$store.state.cart;
            },
            cartTotal() {
                return this.$store.getters.cartTotal;
            }
        }
    }
</script>

<style>
    .flex { display: flex; }
    .flex.flex-column { flex-direction: column; }
    .flex.flex-row { flex-direction: row; }
    .flex.justify-center { justify-content: center; }
    .flex.justify-left { justify-content: flex-start; }
    .flex.justify-right { justify-content: flex-end; }
    .flex.align-center { align-items: center; }
    .flex.align-left { align-items: flex-start; }
    .flex.align-right { align-items: flex-end; }

    /* Navigation */
    .navbar .stats {
        margin: 15px 0 0 10px;
    }

    .navbar .navbar-right > * {
        float: right;
    }
</style>
