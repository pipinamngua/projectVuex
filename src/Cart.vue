<template>
    <div>
        <h1>Cart</h1>

        <table v-if="cart.items.length > 0" class="table table-striped">
            <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="item in cart.items">
                <td>{{ item.product.name }}</td>
                <td>
                    {{ item.quantity }} &nbsp;
                    <button class="btn btn-success" @click="increaseQuantity(item)" :disabled="item.product.inStock == 0">+</button>
                    <button class="btn btn-danger" @click="decreaseQuantity(item)">-</button>
                </td>
                <td>{{ item.quantity * item.product.price | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Subtotal</strong>
                </td>

                <td>{{ cartTotal | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Taxes</strong>
                </td>

                <td>{{ taxAmount(10) | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Grand total</strong>
                </td>

                <td>{{ cartTotal + taxAmount(10) | currency }}</td>
            </tr>

            <tr>
                <td colspan="2"></td>
                <td><button class="btn btn-success" @click="checkout">Checkout</button></td>
            </tr>
            </tbody>
        </table>

        <p v-else>Your cart is currently empty.</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';
    import { CHECKOUT, ADD_PRODUCT_TO_CART } from './mutation-type';

    export default {
        // TODO: Access cart items, cart total, and tax amount

        // TODO: Implement increaseQuantity method

        // TODO: Implement decreaseQuantity method

        // TODO: Implement checkout method
        computed: {
            ...mapGetters([
                'cartTotal',
                'taxAmount'
            ]),
            cart() {
                return this.$store.state.cart;
            }
            // cartTotal() {
            //     return this.$store.getters.cartTotal;
            // },
            // taxAmount() {
            //     return this.$store.getters.taxAmount(20);
            // }
        },
        beforeRouteLeave(to, from, next) {
            if (this.cart.items.length > 0) {
                if (!confirm('Are you sure you don\'t want to buy these amazing products?')) {
                    return next(false);
                }

                this.$store.commit(CHECKOUT);
            }

            next();
        },
        methods: {
            ...mapMutations([
                CHECKOUT
            ])
        }
    }
</script>
