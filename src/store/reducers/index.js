import {combineReducers} from 'redux'
import Product from './product';
import Comment from './comment';

const allReducers = combineReducers({
 Product : Product,
 Comment : Comment
});

export default allReducers;