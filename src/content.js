/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";

class Main extends React.Component {
  constructor(props) {
      super(props);
      var title = document.getElementById('post-title').childNodes[1].childNodes[3].childNodes[1];
      var editor = document.getElementById('post-editor').childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].value
      title.focus();

      if (/```.*?```/gus.exec(editor)) {
        this.snippet = " Woohoo you've included a code snippet!"
      }
      else {
        this.snippet = " Hey, could you possibly add some code for context?"
      }

      if (editor.length < 1350) {;
        this.length = " The body's a bit short, give some more description perhaps? "
      } else {
        this.length += " Now that's a good amount of content "
      }
  }

    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
               <FrameContextConsumer>
               {
                   ({document, window}) => {
                        return (
                           <div className={'my-extension'}>
                               <h2>Construction Tips</h2>
                               <div>{this.snippet}</div>
                               <div></div>
                               <div>{this.length}</div>
                               <h2>Similar Questions</h2>
                               Click anywhere to load questions
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
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);

function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}
