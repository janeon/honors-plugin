import React, { Component } from 'react';
import Question from './Question';

export default class Questions extends Component {
  // really a class of similar questions, each of which contain answers
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    var questions = document.getElementById('question-form').childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[1].childNodes
    if (this.state.questions.length == 0) {
      this.setState({questions: Array.from(questions)});
    }
  }

  render() {
    this.questions = this.state.questions.map((question, index) => {
      if (index % 2 !== 0) {
        return <Question question = {question}/>
      }
    });
    return (
      <div className="questions" onClick={(e) => this.onClick()}>
        <h2>Similar Questions</h2>
        Click to load similar questions
        {this.questions}
      </div>
    )
  }
}
