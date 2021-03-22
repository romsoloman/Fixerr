import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { utilService } from './util.service'

export const reviewService = {
  add,
  query,
  remove,
  getEmptyReview
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  return httpService.get(`review${queryStr}`)
  // return storageService.query('review')
}

function remove(reviewId) {
  return httpService.delete(`review/${reviewId}`)
  // return storageService.delete('review', reviewId)

}
async function add(review) {
  const addedReview = await httpService.post(`review`, review)

  review.byUser = userService.getLoggedinUser()
  review.aboutUser = await userService.getById(review.aboutUserId)
  // const addedReview = storageService.post('review', review)

  return addedReview
}

function getEmptyReview() {
  return {
    by: {
      _id: utilService.makeId(),
      txt: '',
      rate: 0,
    }
  }
}
