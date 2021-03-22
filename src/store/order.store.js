// import { userService } from "../services/user.service.js";
import { orderService } from "../services/order.service.js";

export const orderStore = {
    state: {
        orders: [],
        isLoading: false
    },
    getters: {
        orders(state) { return state.orders },
        isLoading(state) { return state.isLoading },
        ordersSize(state) {
            return state.orders.length
        },
        ordersTotal(state) {
            const total = state.orders.reduce((sum, order) => {
                return sum + order.price
            }, 0)
            return total
        },
        ordersTotalForDisplay(state, getters) {
            return getters.ordersTotal.toLocaleString()
        }
    },
    // Mutations should be SYNC and PURE functions (a pure function does not cause any side effects)
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading;
        },
        setOrders(state, { orders }) {
            state.orders = orders;
        },
        addOrder(state, { order }) {
            state.orders.push(order);
        },
        updateOrder(state, { order }) {
            const idx = state.orders.findIndex(p => p._id === order._id)
            state.orders.splice(idx, 1, order);
        },
        removeOrder(state, { orderId }) {
            const idx = state.orders.findIndex(p => p._id === orderId)
            state.orders.splice(idx, 1)
        },
        clearorders(state) {
            state.orders = [];
        },
    },
    actions: {
        loadOrders({ commit }) {
            commit({ type: 'setIsLoading', isLoading: true });
            orderService.query()
                .then(orders => {
                    commit({ type: 'setOrders', orders });
                })
                .catch(err => {
                    console.log('Store: Cannot load orders', err);
                    throw new Error('Cannot load orders');
                })
                .finally(() => {
                    commit({ type: 'setIsLoading', isLoading: false });
                })
        },
        saveOrder({ commit }, { order }) {
            const type = (order._id) ? 'updateOrder' : 'addOrder';
            return orderService.save(order)
                .then(savedOrder => {
                    console.log('savedOrder', savedOrder);
                    commit({ type, order: savedOrder })
                })
                .catch(err => {
                    console.log('Store: Cannot save order', err);
                    throw new Error('Cannot save order');
                })

        },
        removeOrder({ commit }, payload) {
            return orderService.remove(payload.orderId)
                .then(() => {
                    commit(payload)
                })
                .catch(err => {
                    console.log('Store: Cannot remove order', err);
                    throw new Error('Cannot remove order');
                })
        },
        checkout(context, payload) {

            orderService.save(payload.order)
            const amount = context.getters.ordersTotal
            return userService.withdrawBalance(amount)
                .then((balance) => {
                    context.commit({ type: 'clearorders' })
                    context.commit({ type: 'setBalance', balance })
                })
                .catch(err => {
                    console.log('Store: Cannot checkout', err);
                    throw err;
                })
        }
    }
}
