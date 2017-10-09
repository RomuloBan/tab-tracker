import Api from '@/services/Api'

export default {
  index (bookmark) {
    return Api().get('bookmarks')
  },
  post (bookmark) {
    return Api().post('bookmark', bookmark)
  },
  delete (bookmarkId) {
    return Api().get(`bookmark/${bookmarkId}`)
  }
}
