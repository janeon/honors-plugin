/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";

class Main extends React.Component {
  constructor(props) {
      super(props);
      this.title = document.getElementById('post-title').childNodes[1].childNodes[3].childNodes[1];
      this.editor = document.getElementById('post-editor').childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].value
      console.log(this.editor);
      this.title.focus();
      this.inner = ""
      
      var snippet_pattern = /```.*?```/gus;
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
