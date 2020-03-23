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
      if (index % 2) {
        return <Question question = {question}/>
      }
    });
    return ( 
      <div className="questions">
        <h2>Similar Questions</h2>
        <div><button onClick={(e) => this.onClick()} className="similar">Load similar questions</button></div>
        <div>{this.questions}</div>
      </div>
    )
  }
}
