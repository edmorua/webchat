import React from 'react'


class NickInput extends React.Component{
  constructor(props){
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {username: null};
  }
  handleEnter(e){
    if(e.key === "Enter"){
      e.preventDefault();
      console.log(e.target.value);
      let {handleUserName} = this.props
      handleUserName(e.target.value);
      this.setState({username: e.target.value});
    }
  }
  onClick(e){
    e.preventDefault();
    var aux = document.getElementById('nick-input')
    let {handleUserName} = this.props;
    handleUserName(aux.value);
    this.setState({username:aux.value})
  }
  render(){
    let flag = false;
    if(this.state.username) flag = true;
    return(

      <div>
        <form>
          <div className="form-group row">
            <label className= "col-sm-2 col-form-label">nickname:</label>
            <input disabled={flag} id="nick-input" type="text" className="form-control col-sm-8" placeholder="username" onKeyPress={this.handleEnter}></input>
            <button disabled={flag} type="button" className="btn btn-dark col-sm-2" onClick={this.onClick}>Use</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NickInput;