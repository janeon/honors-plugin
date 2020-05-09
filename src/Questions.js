import React, { Component } from 'react';
import Question from './Question';
import styles from "./content.css";
export default class Questions extends Component {
  // a class of similar questions, each of which contain answers
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // console.log(document.getElementById('question-form').childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes); //.childNodes[1].childNodes
    // console.log(document.getElementById('question-form').childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[1]); //.childNodes[1].childNodes
    // var questions = document.getElementById('question-form').childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[1].childNodes
    var questions = document.getElementById('question-form').childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[1].children
    // console.log(questions);
    if (!this.state.questions.length) {
      this.setState({questions: Array.from(questions)});
    }
    else {
      this.setState({questions: []});
    }
  }

  render() {
    this.questions = this.state.questions.map((question, index) => {
        return <Question question = {question}/>

    });
    return (
      <div>
        <br></br>
        <div className="heading">
        <button>
        <h3 onClick={(e) => this.onClick()}>Similar Questions</h3>
        </button>
        </div>
        <div className="questions">
        {this.questions}
        </div>
      </div>

    )
  }
}
