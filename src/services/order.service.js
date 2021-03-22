
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js';

const KEY = 'orderDB';

export const orderService = {
    query,
    getById,
    remove,
    save,
    getEmptyOrder
}

// _createOrders()
const ORDER_URL = 'order/'
// TODO: support paging and filtering and sorting
async function query() {
    try {
        const orders = await httpService.get(ORDER_URL)
        localStorage.setItem(KEY, JSON.stringify(orders))
        return orders
    } catch (err) {
        console.log('Got err ', err)
    }
    // return storageService.query(KEY)
}

async function getById(id) {
    try {
        const order = await httpService.get(ORDER_URL + id)
        return order
    } catch (err) {
        console.log('Got err ', err)
    }
    // return storageService.get(KEY, id)
}

async function remove(id) {
    try {
        const order = await httpService.delete(ORDER_URL + id)
        return order
    }
    catch (err) {
        console.log('Got err ', err)
    }
    // return storageService.remove(KEY, id)
}

async function save(order) {
    try {
        if (order._id) {
            const updatedOrder = await httpService.put(ORDER_URL + order._id, order)
            return updatedOrder
        } else {
            const savedOrder = await httpService.post(ORDER_URL, order)
            console.log('savedOrder', savedOrder);
            return savedOrder;
        }
    } catch (err) {
        console.log(err)
    }
    // console.log('order-orderservice', order);
    // const savedOrder = (order._id) ? storageService.put(KEY, order) : storageService.post(KEY, order)
    // return savedOrder;
}

function getEmptyOrder(name = '', price = 100) {
    return {
        createdAt: Date.now(),
        buyer: null,
        totalPrice: null,
        seller: {
            _id: null,
            name: '',
            imgUrl: ''
        },
        items: [
            {
                _id: null,
                title: '',
            }
        ],
        status: "pending"
    }
}

// Create Test Data:
// function _createOrders() {
//     var orders = JSON.parse(localStorage.getItem(KEY))
//     if (!orders || !orders.length) {
//         orders = [
//             _createProduct('Television 55 inch'),
//             _createProduct('Tape Double Cassette'),
//             _createProduct('Tea Pot'),
//         ]
//         localStorage.setItem(KEY, JSON.stringify(orders))
//     }
//     return orders;
// }

// function _createProduct(name) {
//     const product = getEmptyProduct(name, utilService.getRandomInt(80, 300))
//     product._id = utilService.makeId()
//     return product
// }
