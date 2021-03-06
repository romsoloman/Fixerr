import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { utilService } from './util.service'

export const likeService = {
  add,
  query,
  remove,
  getEmptyLike,
  findLikeId
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  return httpService.get(`like`)
  // return storageService.query('like')
}

function remove(likeId) {
  return httpService.delete(`like/${likeId}`)
  // return storageService.delete('like', likeId)

}
async function add(like) {
  const addedLike = await httpService.post(`like`, like)

  // like.byUser = userService.getLoggedinUser()
  // like.aboutUser = await userService.getById(like.aboutUserId)
  // const addedlike = storageService.post('like', like)

  return addedLike
}
function findLikeId(gigId, user, likes) {
  const idToRemove = likes.find(like => {
    if (like.likedGigId === gigId && like.userThatLikedId === JSON.parse(user)._id) {
      return like
    }
  });
  return idToRemove
}

function getEmptyLike() {
  return {
    by: {
      _id: utilService.makeId(),
      txt: '',
      rate: 1,
    }
  }
}
