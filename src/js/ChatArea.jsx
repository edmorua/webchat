import React from "react";
import ReactDOM from "react-dom";



class ChatText extends React.Component{
  constructor(props){
    super(props);
    this.username = this.props.username;
    this.data = this.props.data;
  }
  render(){
    let username = this.username;
    let data = this.data;
    let li;
    if(username === ""){
      li = <li>{data}</li>
    }
    else{
      li = <li>{username + " says : " + data}</li>

    }
    return (
      li
    );
  };
}


class ChatArea extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      addedText: false,
    }

    this.listText = this.props.listText;
  }

  render(){
    var list = [];
    for(var i = 0; i < this.listText.length; i++){
      var aux =  <ChatText username={this.listText[i].username} data={this.listText[i].message}></ChatText>;
      list.push(aux);
    }
    return(
      <div style={{width: "100%", height:"89vh"}}>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}


export default ChatArea;