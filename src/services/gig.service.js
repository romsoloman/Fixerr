import { utilService } from "./util.service.js";
// import axios from 'axios'
import { storageService } from "./async-storage.service.js";
const gGigs = require('../data/gig.json');
const KEY = 'gigDB';

// const GIG_URL = 'http://localhost:3030/api/gig/'
// _createToys();

export const gigService = {
  query,
  getById,
  remove,
  save,
  getEmptyGig
}

function query(filterBy) {
  const gigsFromStorage = localStorage.getItem(KEY);
  if (!filterBy && !gigsFromStorage) localStorage.setItem(KEY, JSON.stringify(gGigs))
  else {
<<<<<<< HEAD
    const gigs = gigsFromStorage.filter(gig => {
      return (gig.tags.includes(filterBy.name) || ((gig.tags.includes(filterBy.name)) && (gig.price >= filterBy.price.minPrice && gig.price <= filterBy.price.maxPrice) &&
        (filterBy.rating === gig.rating) && (filterBy.level === gig.creator.level))
      ) // TODO fix the problem with the second if statement!!!!!!!!!
=======
    const gigs = gGigs.filter(gig => {
      return ((gig.tags.includes(filterBy.name)))
        (gig.price >= filterBy.price.minPrice && gig.price <= filterBy.price.maxPrice) &&
        (filterBy.rating === gig.rating) &&
        (filterBy.level === gig.creator.level)
>>>>>>> 4824bf9ecedda1ce825ba8196813f74b31186d49
    })
    localStorage.setItem(KEY, JSON.stringify(gigs))
  }
  return storageService.query(KEY);
}

function getById(id) {
  // return axios.get(TOY_URL + id)
  //   .then(res => {
  //     return res.data
  //   })
  return storageService.get(KEY, id)
}

function remove(id) {
  // return axios.delete(TOY_URL + id)
  //   .then(res => res.data)
  return storageService.remove(KEY, id)
}

function save(gig) {
  // if (gig._id) {
  //   return axios.put(gig_URL + gig._id, gig)
  //     .then(res => res.data)
  // } else {
  //   return axios.post(gig_URL, gig)
  //     .then(res => res.data)
  // }
  console.log('gig srvice', gig);
  const savedGig = (gig._id) ? storageService.put(KEY, gig) : storageService.post(KEY, gig)
  console.log('savedGig', savedGig);
  return savedGig;
}

function getEmptyGig() {
  return {
    title: '',
    about: '',
    tags: [],
    imgsUrls: [],
    price: 0,
    deliveryTime: '',
    rating: 4,
    creator: {
      fullname: '',
      imgUrl: '',
      level: 3,
    },
    review: []
  }
}



// Create Test toys Data:
// function _createToys() {
//   var toys = JSON.parse(localStorage.getItem(KEY))
//   if (!toys || !toys.length) {
//     const TOY_URL = 'http://www.filltext.com/?rows=20&_id=%7bindex%7d&name=%7blorem|2%7d&price=%7bnumber|100%7d&type=%5b%22Educational%22,%22Funny%22,%22Adult%22%5d&createdAt=%7bdate|1970,2000%7d&inStock=%7bbool%7d&pretty=true'
//     return axios.get(TOY_URL)
//       .then(res => {
//         toys = res.data
//         localStorage.setItem(KEY, JSON.stringify(toys))
//       })
//   }
//   return toys;
// }
