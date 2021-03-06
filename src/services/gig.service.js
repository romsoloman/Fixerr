import { utilService } from "./util.service.js";
import { httpService } from './http.service.js';
import { storageService } from "./async-storage.service.js";
const gGigs = require('../data/gig.json');
const KEY = 'gigDB';

const GIG_URL = 'gig/'
// _createToys();

export const gigService = {
  query,
  getById,
  remove,
  save,
  getEmptyGig,
  getByUserId,
}

async function query(filterBy) {
  try {
    const gigs = await httpService.get(GIG_URL, filterBy)
    localStorage.setItem(KEY, JSON.stringify(gigs))
    return gigs
  } catch (err) {
    console.log('Got err ', err)
  }
}

async function getById(id) {
  try {
    const gig = await httpService.get(GIG_URL + id)
    return gig
  } catch (err) {
    console.log('Got err ', err)
  }
}

async function getByUserId(id) {
  try {
    const gig = await httpService.get(`${GIG_URL + id}/profile`)
    return gig
  } catch (err) {
    console.log('Got err ', err)
  }
}

async function remove(id) {
  try {
    const gig = await httpService.delete(GIG_URL + id)
    return gig
  }
  catch (err) {
    console.log('Got err ', err)
  }
}

async function save(gig) {
  try {
    if (gig._id) {
      const updatedGig = await httpService.put(GIG_URL + gig._id, gig)
      return updatedGig
    } else {
      const savedGig = await httpService.post(GIG_URL, gig)
      return savedGig;
    }
  } catch (err) {
    console.log(err)
  }
}

function getEmptyGig() {
  return {
    title: '',
    about: '',
    tags: [],
    imgUrls: [''],
    price: 0,
    deliveryTime: null,
    rating: 4,
    creator: {
      fullname: '',
      imgUrl: '',
      level: 3,
      location: "Israel",
      memberSince: null,
      avgResponseTime: `${utilService.getRandomInt(1, 6)} Hours`,
      lastDelivery: `About ${utilService.getRandomInt(1, 6)} Hours`,
    },
    reviews: []
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
