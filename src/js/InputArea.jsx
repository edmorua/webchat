import React from "react";
import {FaPaperPlane} from 'react-icons/fa';

class InputArea extends React.Component{
  constructor(props){
    super(props)

    this.enterPress = this.enterPress.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  enterPress(e){
    
    if(e.key === "Enter"){
      e.preventDefault();
      this.props.handleText(e.target.value);
      e.target.value = "";
    }
  }
  onClick(e){
    e.preventDefault();
    var aux = document.getElementById('message-input');
    this.props.handleText(aux.value);
    aux.value = "";
  }
  render(){
    return(
      <form>
        <div className="form-group row">
          <input id="message-input" className="col-sm-10 form-control" type="text" onKeyPress={this.enterPress}></input>
          <button type="button" className="btn btn-dark col-sm-2" onClick={this.onClick}><FaPaperPlane></FaPaperPlane></button>
        </div>
      </form>
    );
  }
}

export default InputArea;