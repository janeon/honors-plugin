/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, {
  FrameContextConsumer
} from 'react-frame-component';
import Questions from './Questions';
import styles from "./content.css";
import { faCode, faExpandAlt, faEraser} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

class Main extends React.Component {
    constructor(props) {
      super(props);
      this.predictions = {
        '000': 0.5,
        '001': 0.5556,
        '010': 0.5316,
        '100': 0.8951,
        '011': 0.5866,
        '110': 0.9064,
        '101': 0.9143,
        '111': 0.9237
      }
      var title = document.getElementById('post-title').childNodes[1].childNodes[3].childNodes[1];
      title.focus();
      this.updateAttributes = this.updateAttributes.bind(this);
      this.callback = this.callback.bind(this);
      this.state = { body : "" }
      var totalProgress, progress;
    	const circles = document.querySelectorAll('.progress');
    	for(var i = 0; i < circles.length; i++) {
    		totalProgress = circles[i].querySelector('circle').getAttribute('stroke-dasharray');
    		progress = circles[i].parentElement.getAttribute('data-percent');

    		circles[i].querySelector('.bar').style['stroke-dashoffset'] = totalProgress * progress / 100;
    	}
    }

    updateAttributes() {
      if (/```.*?```/gus.exec(this.state.body)) {
        this.snippet = " Woohoo that's a beautiful code snippet!";
        this.code_presence = 1
      } else {
        this.snippet = " Any relevant code snippets to add?";
        this.code_presence = 0
      }

      if (this.state.body.length < 1350) {
        this.length = " The body's a bit short, can it be more descriptive? "
        this.length_presence = 0
      } else {
        this.length = " Loads of content ==> lots more views!  ";
        this.length_presence = 1
      }

      var attempt_signifying_words = ["attempt", "try", "tried", "tries"]
      this.attempt_presence = 0
      var used_words = []
      for (var word of attempt_signifying_words) {
        if (this.state.body.includes(word)) {
          used_words.push(word)
        }
      }
      if (used_words.length) {
        this.attempt_presence = 1
        this.attempts_message = "Nice tries! Attempts detected from words: "
        for (var word of used_words) {
          this.attempts_message += " "+ word
        }
      }
      else {
        this.attempts_message = "Can you desribe anything you've tried so far?"
      }

      var binary_features = this.code_presence.toString() + this.length_presence.toString() + this.attempt_presence.toString()
      this.prediction = this.predictions[binary_features].toString()
      // console.log(binary_features);
    }

    callback(mutationsList, observer) {
      // console.log(document.getElementById('post-editor').childNodes[1].childNodes[3].childNodes[4].childNodes[1].childNodes[1].value);
      this.setState({ body: document.getElementById('post-editor').childNodes[1].childNodes[3].childNodes[4].childNodes[1].childNodes[1].value });
      this.updateAttributes()
    }
    componentDidMount() {
      // First we find the id of each suggested question, extracted from the question post urls
      // Then a question div / component is created for each question
      // within each question the list of answers are queried via asios (answers component receives question id as part of its props)

      // this.editor = document.getElementById('post-editor').childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].value
      this.setState({ body: document.getElementById('post-editor').childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].value});

      const targetNode = document.getElementById('post-editor');
      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true};

      // Create an observer instance linked to the callback function
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      this.observer = new MutationObserver(this.callback);

      // Start observing the target node for configured mutations
      this.observer.observe(targetNode, config);
    }

    componentDidUnmount() {
      this.observer.disconnect();
    }

    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
               <FrameContextConsumer>
               {({document, window}) => {
                        return (
                           <div className={'so-extension'}>


                           <div className={"progressBar"}>
                           <div class={"c100 p"+(this.prediction * 100).toFixed(0).toString()+" small"}>
                               <span>{(this.prediction * 100).toFixed(0).toString()}%</span>
                               <div class="slice">
                                   <div class="bar"></div>
                                   <div class="fill"></div>
                               </div>
                           </div>
                           &nbsp;
                           <h3>Answerability Prediction</h3>
                           &nbsp;
                           </div>
                               <h3>Construction Tips</h3>
                                 <div className={"wrapperDiv"}>
                                      <FontAwesomeIcon icon={faCode} className={"icon" + (this.code_presence ? 'Good' : 'Bad')}/>
                                      {this.snippet}
                                   &nbsp;
                                 </div>

                                 <br></br>
                                 <div className={"wrapperDiv"}>
                                   <FontAwesomeIcon icon={faExpandAlt} className={"icon" + (this.length_presence ? 'Good' : 'Bad')}/>
                                   {this.length}
                                   &nbsp;
                                 </div>

                                 <br></br>
                                 <div className={"wrapperDiv"}>
                                   <nobr>
                                   <FontAwesomeIcon icon={faEraser} className={"icon" + (this.attempt_presence ? 'Good' : 'Bad')}/>
                                  {this.attempts_message}
                                   </nobr>
                                   &nbsp;
                                 </div>
                                 <br></br>
                               <Questions/>
                           </div>
                        )
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}



const app = document.createElement('div');
app.id = "so-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if(request.message === "clicked_browser_action") {
        toggle();
      }
   }





);

function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";

   }
   else {
     app.style.display = "none";
   }
}
