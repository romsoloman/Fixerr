import { httpService } from './http.service'

export const notificationService = {
  query,
}

function query(filterBy) {
  return httpService.get(`notification`)
  // return storageService.query('like')
}
