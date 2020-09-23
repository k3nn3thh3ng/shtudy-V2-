import test from '../apis/test';

export const fetchQuestions = () => async (dispatch) => {
    const response = await test.get('/post');

    dispatch({
        type: 'FETCH_QUESTION',
        payload: response.data
    })
}

export const createQuestion = (formValues) => async (dispatch) => {
	test.post('/', formValues)
}

export const createUser = (formValues) => async (dispatch) => {
	test.post('/user', formValues)
}