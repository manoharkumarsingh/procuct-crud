var axios = require('axios')
var ES6Promise = require('es6-promise')
ES6Promise.polyfill()
const ApiService = {
    get( apiurl) {
      return axios.get(apiurl)
      .then(response => {
          return response.data
        })
        .catch(response => {
            return response.data
        })
    },

    post( apiurl,bodyFormData) {
        return axios.post(apiurl,bodyFormData)
        .then(response => {
            return response
          })
        .catch(err => console.log(err))
    },


    put( apiurl,bodyFormData) {
        return axios.put(apiurl,bodyFormData)
        .then(response => {
            return response
          })
        .catch(err => console.log(err))
    },
    delete( apiurl,bodyFormData) {
        return axios.delete(apiurl)
        .then(response => {
            return response
          })
        .catch(err => console.log(err))
    }
}
  export default ApiService



export const productModule = {
  getProduct() {
    return ApiService.get( 'http://localhost:4600/posts/' )
  },
  selectedProduct(product) {
    return ApiService.get( 'http://localhost:4600/posts/'+product)
  },

  addProduct(product) {
    return ApiService.post( 'http://localhost:4600/posts/',product)
  },

  updateProduct(product,productid) {
    return ApiService.put( 'http://localhost:4600/posts/'+productid,product)
  },

  deleteProduct(product) {
    return ApiService.delete( 'http://localhost:4600/posts/'+product)
  }
}

export const commentModule = {
    commentProduct(product,comment) {
        return ApiService.post( 'http://localhost:4600/posts/'+product+'/comment',comment)
      },
    getComments(product){
        return ApiService.get( 'http://localhost:4600/posts/'+product+'/comment')
    },
    deleteComment(comment){
        return ApiService.delete( 'http://localhost:4600/posts/comment/'+comment)
    },
    updateComment(comment,data){
        return ApiService.put( 'http://localhost:4600/posts/comment/'+comment,data)
    }
  
  }
