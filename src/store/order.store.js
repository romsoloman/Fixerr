// import { userService } from "../services/user.service.js";
import { orderService } from "../services/order.service.js";

export const orderStore = {
    state: {
        currOrder: null,
        orders: [],
        isLoading: false
    },
    getters: {
        orders(state) { return state.orders },
        ordersSize(state) {
            return state.orders.length
        },
        avgPrice(state, getters) {
            const total = state.orders.reduce((sum, order) => {
                return sum + order.totalPrice
            }, 0)
            const avg = total / getters.ordersSize;
            return avg;
        },
        bestBuyer(state) {

            var bestObj = {};

            for (var order of state.orders) {
                if (!bestObj[order.buyer.fullname]) {
                    bestObj[order.buyer.fullname] = 1;
                } else {
                    bestObj[order.buyer.fullname]++;
                }
            }
            return Object.keys(bestObj)[0];
        },
        ordersTotal(state) {
            const total = state.orders.reduce((sum, order) => {
                return sum + order.totalPrice
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
        changeStatus(state, { res, order }) {
            state.currOrder = order
            if (res === 'Approve') {
                state.currOrder.status = 'done';
            } else state.currOrder.status = 'cancel';
        }
    },
    actions: {
        loadOrders({ commit }, { userId }) {
            commit({ type: 'setIsLoading', isLoading: true });
            orderService.query(userId)
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
