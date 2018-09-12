<template>
    <div>
        <button class="btn btn-primary" @click="goBack">&laquo; Back</button>
        <button class="btn btn-success" @click="addProductToCart">Add Product To Cart</button>
        <div v-if="product != null">
            <h1>{{ product.name }}</h1>

            <p><strong>ID:</strong> {{ product.id }}</p>
            <p><strong>Price:</strong> {{ product.price | currency }}</p>
            <p><strong>In stock:</strong> {{ product.inStock }}</p>
            <p>{{ product.description }}</p>

            <h2>Reviews</h2>

            <div v-if="product.reviews.length > 0">
                <div v-for="review in product.reviews">
                    <strong>{{ review.reviewer }}</strong> (rating: {{ review.rating }}) -
                    <a href="#" @click.prevent="deleteReview(review)">delete</a>
                    <p>{{ review.text }}</p>
                </div>
            </div>

            <div v-else>
                <p>No reviews have been added for this product.</p>
            </div>

            <h3>Add Review</h3>

            <form @submit.prevent="addNewReview(newReview)">
                <div class="form-group">
                    <label for="reviewName">Name</label>
                    <input type="text" v-model="newReview.reviewer" class="form-control" id="reviewName" placeholder="Name">
                </div>

                <div class="form-group">
                    <label for="reviewRating">Rating</label>
                    <input type="number" v-model.number="newReview.rating" class="form-control" id="reviewRating" placeholder="Rating">
                </div>

                <div class="form-group">
                    <label for="reviewText">Text</label>
                    <textarea v-model="newReview.text" class="form-control" id="reviewText" cols="30" rows="10"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit Review</button>
            </form>
        </div>

        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
    import { ADD_PRODUCT_TO_CART } from './mutation-type';

    export default {
        props: {
            productId: {
                required: true
            }
        },
        data() {
            return {
                product: null,
                newReview: {
                    text: '',
                    rating: 0,
                    reviewer: ''
                }
            };
        },
        computed: {
            cart() {
                return this.$store.state.cart;
            }
            // cartTotal: {
            //     get: function() {
            //         return this.$store.state.cartTotal;
            //     },
            //     set: function(value) {
            //         this.$store.state.cartTotal = value;
            //     }
                
            // }
        },
        created() {
            this.getProduct(this.productId)
                .then(product => this.product = product);
        },
        beforeRouteUpdate(to, from, next) {
            this.getProduct(to.params.productId)
                .then(product => this.product = product);

            next();
        },
        methods: {
            getProduct(productId) {
                return this.$http.get('products/{productId}', {
                    params: {
                        productId: productId
                    }
                }).then(
                    response => response.json(),
                    response => alert("Could not retrieve product!")
                );
            },
            goBack() {
                this.$router.history.go(-1);
            },
            addNewReview(review) {
                // TODO: Implement
            },
            deleteReview(review) {
                // TODO: Implement
            },
            [ADD_PRODUCT_TO_CART]() {
                this.$store.dispatch(ADD_PRODUCT_TO_CART, {
                    product: this.product,
                    quantity: 1
                });
            }
            
        }
    }
</script>
