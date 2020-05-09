import React, {
  Component
} from 'react';
import axios from 'axios';
import styles from "./Question.css";

// https://daveceddia.com/ajax-requests-in-react/
export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      answerIDs: [],
      showAnswers: false,
      answerCount: 1,
      buttons: []
    }
    this.question = props.question
    // https://stackoverflow.com/questions/23616226/insert-html-with-react-variable-statements-jsx
    this.href = this.question.childNodes[3].childNodes[1].getAttribute("href")
    this.QID = this.href.split("https://stackoverflow.com/questions/")[0].split("/")[2];
    axios.get(`https://api.stackexchange.com/2.2/questions/` + this.QID + `/answers?order=desc&sort=activity&site=stackoverflow&key=hY9*cg5149D6VioJ9)bvog((`)
      .then(answers => { // these are answer objects
        var answerObjects = Array.from(answers.data.items)
        answerObjects.map((answer, index) => {
          var newButton =
          <button onClick = {(e) => this.highlightAnswer(index)} id={this.QID+index}>
          { index + 1 }
          </button>
          this.setState({
            answerIDs: [answer.answer_id].concat(this.state.answerIDs),
            buttons: [newButton].concat(this.state.buttons)
          })
        })
      })
      .catch(error => {
        console.log("uh-oh, error occurred");
      });
    this.link = "https://stackoverflow.com/" + this.href
  }

  highlightAnswer(index) {
    this.setState({currentAnswer: this.state.answers[index],
                   answerCount: index
    });
    this.populate()
    console.log(index);
    console.log(this.answerIDs.length);
    for (var i = 0; i < this.answerIDs.length; i++) {
      if (i == index) {
        document.getElementsByID(this.QID+index).style.backgroundColor = "green"
      }
      else
        document.getElementsByID(this.QID+index).style.backgroundColorcolor = "#f5f5dc"
    }
  }

  forward() {
    if (this.state.answerCount < this.state.answerIDs.length) {
      this.setState({
        currentAnswer: this.state.answers[this.state.answerIDs.length - this.state.answerCount + 1],
        answerCount: this.state.answerCount + 1
      })
    }
    this.populate()
  }

  back() {
    if (this.state.answerCount > 0) {
      this.setState({
        currentAnswer: this.state.answers[this.state.answerIDs.length - this.state.answerCount - 1],
        answerCount: this.state.answerCount - 1
      })
    }
    this.populate()
  }

  populate() {
    Array.from(this.state.answerIDs).map((answerID, index) => {
      axios.get(`https://api.stackexchange.com/2.2/answers/` + answerID + `?order=desc&sort=activity&site=stackoverflow&filter=withbody&key=hY9*cg5149D6VioJ9)bvog((`)
        .then(answersObj => {
          this.setState({answers: [answersObj.data.items[0].body].concat(this.state.answers)});
        })
    })
    // console.log(this.state.answerCount);
  }
  onClick() {
    if (!this.state.showAnswers) {
      this.setState({currentAnswer: this.state.answers[this.state.answerIDs.length - this.state.answerCount + 1]});
      this.populate()
    }

    else {
      this.setState({currentAnswer: []});
    }
    this.state.showAnswers = !this.state.showAnswers
  }
  render() {
    return (

      <div className="slideshow">

      <div>&emsp;
      <a href={this.link}>
      {this.question.childNodes[3].childNodes[1].childNodes[1].textContent}
      </a>
      <button onClick = {(e) => this.onClick()} className={"right"}> {this.state.answerIDs.length} answers</button>
      </div>

      <div className = "answers">
      <div dangerouslySetInnerHTML = {{__html: this.state.currentAnswer}} className="content">
      </div>


      </div>
      <div className="numberWrapper">

      <div>
      <button onClick={(e) => this.forward()}>&#10095;</button>
      {this.state.buttons}
      <button onClick={(e) => this.back()}>&#10094;</button>
      </div>

      </div>
      <br></br>
      </div>
    )
  }
}
