
import {storageService} from './async-storage.service.js'
import {utilService} from './util.service.js'

const KEY = 'orderDB';

export const orderService = {
    query,
    getById,
    remove,
    save,
    getEmptyProduct
}

_createProducts()

// TODO: support paging and filtering and sorting
function query() {
    return storageService.query(KEY)
}

function getById(id) {
    return storageService.get(KEY, id)
}

function remove(id) {
    return storageService.remove(KEY, id)
}

function save(order) {
    console.log('oeder saved : in localStorage : ',order)
    const savedProduct = (order._id) ? storageService.put(KEY, order) : storageService.post(KEY, order)
    return savedProduct;
}

function getEmptyProduct(name='', price=100) {
    return {
        _id: '',
        name,
        price,
        tags: []
    }
}

// Create Test Data:
function _createProducts() {
    var products = JSON.parse(localStorage.getItem(KEY))
    if (!products || !products.length) {
        products = [
                _createProduct('Television 55 inch'),
                _createProduct('Tape Double Cassette'),
                _createProduct('Tea Pot'),
            ]
        localStorage.setItem(KEY, JSON.stringify(products))
    }
    return products;
}

function _createProduct(name) {
    const product = getEmptyProduct(name, utilService.getRandomInt(80, 300))
    product._id = utilService.makeId()
    return product
}

