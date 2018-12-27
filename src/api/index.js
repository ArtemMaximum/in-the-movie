import axios from 'axios'


const LocalStore = {}

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'c4b50bad048769fabdb6f46d0cca11cb',
  },
})

LocalStore.request = config => api.request(config);

['delete', 'get', 'head'].forEach((method) => {
  LocalStore[method] = (url, config) => LocalStore.request({ ...config, method, url })
});

['post', 'put', 'patch'].forEach((method) => {
  LocalStore[method] = (url, data, config) => LocalStore.request({ ...config, method, url, data })
})

export default LocalStore
