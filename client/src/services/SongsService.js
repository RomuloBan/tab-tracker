import Api from '@/services/Api'

export default {
  index () {
    return Api().get('songs')
  },
  post (song) {
    return Api().post('song', song)
  },
  show (songId) {
    return Api().get(`song/${songId}`)
  }
}
