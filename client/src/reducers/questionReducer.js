export default function questionsReducer(allQuestions = [], action) {
    if (action.type === 'FETCH_QUESTION') {
        return action.payload
    } return allQuestions
};