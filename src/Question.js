import React, { Component } from 'react';
import axios from 'axios';
import "./Question.css";

// https://daveceddia.com/ajax-requests-in-react/
export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: "",
      answer_ids: [],
      show_answers: false
    }
    this.question = props.question
    // https://stackoverflow.com/questions/23616226/insert-html-with-react-variable-statements-jsx
    this.q_id = this.question.childNodes[3].childNodes[1].getAttribute("href").split("https://stackoverflow.com/questions/")[0].split("/")[2];
    axios.get(`https://api.stackexchange.com/2.2/questions/` + this.q_id + `/answers?order=desc&sort=activity&site=stackoverflow&key=hY9*cg5149D6VioJ9)bvog((`)
      .then(answers => { // these are answer objects
        var answerObjects = Array.from(answers.data.items)
        answerObjects.map((answer, index) => {
            this.setState({answer_ids: this.state.answer_ids.concat([answer.answer_id])})
        })
      })
      .catch(error => {
        console.log("uh-oh, error occurred");
      });
  }

  onClick() {
    if (!this.show_answers) {
      Array.from(this.state.answer_ids).map((answer_id, index) => {
        axios.get(`https://api.stackexchange.com/2.2/answers/`+ answer_id+ `?order=desc&sort=activity&site=stackoverflow&filter=withbody&key=hY9*cg5149D6VioJ9)bvog((`)
          .then(answers_obj => {
            this.setState({answers: this.state.answers + '<li>'+answers_obj.data.items[0].body+'</li>'});
          })
      })
    }
    else {
      this.setState({answers: ""});
    }
    this.show_answers = !this.show_answers
  }

  render() {

    return (
      <div className = "question">
      <ul>
      <button onClick = {(e) => this.onClick()} > {this.state.answer_ids.length} answers</button>
      <li>
      {this.question.childNodes[3].childNodes[1].childNodes[1].textContent}
      </li>
      <div className = "answers"><ol dangerouslySetInnerHTML = {{__html: this.state.answers}} ></ol></div>
      </ul>
      </div>
    )
  }
}
