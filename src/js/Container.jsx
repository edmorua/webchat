import React from "react";
import ReactDOM from 'react-dom';
import ChatArea from "./ChatArea.jsx";
import InputArea from "./InputArea.jsx";
import socketIOClient from "socket.io-client";
import NickInput from "./NickInput.jsx";


const endpoint = "http://localhost:3000"
let socket = socketIOClient(endpoint);
class Container extends React.Component{
  constructor(props){
    super(props);
    this.state = {addData: false,username: "" ,update:true};
    this.handleText = this.handleText.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.listText = [];

  }

  handleText(text){
    let obj = {
      username: this.state.username,
      message: text,
    }
    console.log(obj);
    socket.emit('new message',obj)
    this.listText.push(obj);
    this.setState({addData : true});
  }
  handleUserName(username){
    socket.emit("add user", username);
    this.setState({username: username});
  }
  componentDidMount(){
    socket.on('user joined', (data)=>{
      let str = data.username + " has join the room";
      this.listText.push({username:"", message:str});
      console.log(this.listText);
      this.setState({update: true});
    });

    socket.on('new message', (data) =>{
      let {username, message}  = data;
      if(this.state.username !== username)
        this.listText.push({username,message});
      this.setState({update:true});
    })

    socket.on('user left', (data) => {
      let str = data.username + " has left the room";
      this.listText.push({username:"",message:str})
      this.setState({update:true})
    })
  }

  render(){
    return (
      <div className="container-fluid " >
      <div className="row" style={{height: "100%"} }>
        <div className="col-12 col-lg-6 offset-lg-3  my-2 bg-light">
          <NickInput handleUserName={this.handleUserName}></NickInput>
          <ChatArea listText={this.listText}></ChatArea>
          <InputArea handleText={this.handleText}></InputArea>
        </div>
      </div>
      </div>

    );
  }


}

export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;