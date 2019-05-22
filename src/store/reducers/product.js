import {
    PRODUCT_SELECTED,
    PRODUCT_LIST,
    ADD_PRODUCT,
    UPDATE_PRODUCT
  } from '../actionTypes';
  
  const initialState = {
    products: {},
    selectedProducts: [{
        _id : '',
        title:'',
        content:''
    }],
    addedProducts: {},
  }
  export default function(state = initialState, action){
    switch(action.type){
        case PRODUCT_SELECTED:
        return {
            ...state,
            selectedProducts: action.payload
          };
        case PRODUCT_LIST :
        return {
            ...state,
            products: action.payload
          };
        case ADD_PRODUCT :
        return {
            ...state,
            addedProducts: action.payload
          };
        case UPDATE_PRODUCT : 
        return{
            ...state,
            addedProducts: action.payload
        };

        default:
            return state; 
    }
}



