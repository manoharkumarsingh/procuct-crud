import {
    COMMENT_PRODUCT,
    PRODUCT_All_COMMENTS
  } from '../actionTypes';
  
  const initialState = {
    commentedproducts: {
        _id : '',
        title:'',
        content:'',
        comment :[]
    },
    
    allcomments:[]
  }
  export default function(state = initialState, action){
    switch(action.type){
        case COMMENT_PRODUCT:
        return {
            ...state,
            commentedproducts: action.payload
          };
        case PRODUCT_All_COMMENTS :
        return {
            ...state,
            allcomments: action.payload
          };
        default:
            return state; 
    }
}



