import { jsonCore } from './ajaxjsoncore'

export default {
  getShareText: async () => jsonCore('/api/share-text'),
  updateShareText: async (data) => jsonCore('/api/share-text', 'put', data),
  deleteShareText: async (id) => jsonCore('/api/share-text', 'delete', { _id: id }),
  deleteShareTextMore: async (data) => jsonCore('/api/share-text/more', 'delete', data),
  saveShareText: async (data) => jsonCore('/api/share-text', 'post', data)
}
