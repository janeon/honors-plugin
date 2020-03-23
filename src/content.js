/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import Questions from './Questions';
import styles from "./content.css";
import {faCode, faExpandAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Main extends React.Component {
    constructor(props) {
      super(props);
      var title = document.getElementById('post-title').childNodes[1].childNodes[3].childNodes[1];
      var editor = document.getElementById('post-editor').childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].value
      title.focus();
      this.snippet = (/```.*?```/gus.exec(editor)) ? " Woohoo you've included a code snippet!" : " Any relevant code snippets to add?";
      this.length = (editor.length < 1350) ? " The body's a bit short, can it be more descriptive? " : " Now that's a good amount of content ";
    }

    componentDidMount() {

      // First we find the id of each suggested question, extracted from the question post urls
      // Then create a questions div / component for each question
      // within each question the list of answers need to be queried via asios (answers component receives question id as part of its props)

    }

    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
               <FrameContextConsumer>
               {
                   ({document, window}) => {
                        return (
                           <div className={'so-extension'}>
                               <h2>Construction Tips</h2>
                                 <div className={"wrapperDiv"}>
                                   <FontAwesomeIcon icon={faCode} className={"icon"}/>
                                   {this.snippet}&nbsp;
                                 </div>
                                 <br></br>
                                 <div className={"wrapperDiv"}>
                                   <FontAwesomeIcon icon={faExpandAlt} className={"icon"}/>
                                   {this.length}&nbsp;
                                 </div>
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
