// import { userService } from "../services/user.service.js";
import { orderService } from "../services/order.service.js";


export const productStore = {
    state: {
        products: [],
        cartProducts: [],
        isLoading: false
    },
    getters: {
        products(state) { return state.products },
        cartProducts(state) { return state.cartProducts },
        isLoading(state) { return state.isLoading },
        cartSize(state) {
            return state.cartProducts.length
        },
        cartTotal(state) {
            const total = state.cartProducts.reduce((sum, cartProduct) => {
                return sum + cartProduct.price
            }, 0)
            return total
        },
        cartTotalForDisplay(state, getters) {
            return getters.cartTotal.toLocaleString()
        }
    },
    // Mutations should be SYNC and PURE functions (a pure function does not cause any side effects)
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading;
        },
        setProducts(state, {products}) {
            state.products = products;
        },
        addProduct(state, { product }) {
            state.products.push(product);
        },
        updateProduct(state, { product }) {
            const idx = state.products.findIndex(p => p._id === product._id)
            state.products.splice(idx, 1, product);
        },
        removeProduct(state, { productId }) {
            const idx = state.products.findIndex(p => p._id === productId)
            state.products.splice(idx, 1)
        },
        addToCart(state, { product }) {
            state.cartProducts.unshift(product);
        },
        removeFromCart(state, { productId }) {
            const idx = state.cartProducts.findIndex(cp => cp._id === productId);
            state.cartProducts.splice(idx, 1)
        },
        clearCart(state) {
            state.cartProducts = [];
        },
    },
    actions: {
        loadProducts({commit}) {
            commit({ type: 'setIsLoading', isLoading: true });
            productService.query()
                .then(products => {
                    commit({ type: 'setProducts', products });
                })
                .catch(err => {
                    console.log('Store: Cannot load products', err);
                    throw new Error('Cannot load products');
                })
                .finally(()=>{
                    commit({ type: 'setIsLoading', isLoading: false });
                })
        },
        saveProduct({commit}, { product }) {
            const type = (product._id) ? 'updateProduct' : 'addProduct';
            return productService.save(product)
                .then(savedProduct => {
                    commit({ type, product: savedProduct })
                })
                .catch(err => {
                    console.log('Store: Cannot save product', err);
                    throw new Error('Cannot save product');
                })

        },
        removeProduct({commit}, payload) {
            return productService.remove(payload.productId)
                .then(() => {
                    commit(payload)
                })
                .catch(err => {
                    console.log('Store: Cannot remove product', err);
                    throw new Error('Cannot remove product');
                })
        },
        checkout(context) {
            const amount = context.getters.cartTotal
            return userService.withdrawBalance(amount)
                .then((balance) => {
                    context.commit({ type: 'clearCart' })
                    context.commit({ type: 'setBalance', balance })
                })
                .catch(err => {
                    console.log('Store: Cannot checkout', err);
                    throw err;
                })
        }
    }
}
