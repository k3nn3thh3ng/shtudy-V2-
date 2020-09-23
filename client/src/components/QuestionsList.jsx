import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/index';

class QuestionsList extends React.Component {

    componentDidMount() {
        this.props.fetchQuestions();

    }
	
	renderQuestions = (questions) => {
		console.log(questions)
		return questions.map(question => {
			return (
				<div key={question.animal}>
					<h2>The {question.animal} goes {question.sound}!</h2>
				</div>
			)
		})
	}

    render() {
        return (
			<div>
				{this.renderQuestions(this.props.questionsList)}
			</div>
		)
    }
}

const mapStateToProps = (state) => {
    return {
		questionsList: state.questionsList
	}
}

const mapDispatchToProps = {fetchQuestions: fetchQuestions}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionsList);