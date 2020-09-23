import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import questionsListReducer from './questionReducer';


export default combineReducers({
    questionsList: questionsListReducer,
	form: formReducer
})
