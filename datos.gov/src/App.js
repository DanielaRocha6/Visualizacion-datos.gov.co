import React from 'react';
import './App.css';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      url: 'Ingresa url'
    };
    this.handleSubmit=this.handleSubmit.bind(this);
  }

 
change() {
  
  console.log(`URl es: ${this.url.value}`)
  this.setState( {
    url : this.url.value
  })
}

handleSubmit(event) { 
  event.preventDefault();
  alert(`${this.url.value}`);
  fetch(`${this.url.value}`)
  .then(req => {
    return req.json();
  })
  .then(data => {
    console.log(data);
  });
  
  }
 render() {
  return (
    <div>
    <div>
      <h1>Visualización datos de datos.gov.co</h1>
      <form className="form" onSubmit={this.handleSubmit} >
        <input placeholder="Ingresa una url" type="text" 
        ref={ url => this.url = url}  onChange = {this.change.bind(this)}  />
        <br/>
        <input type="submit" value="CONSULTAR" />
        </form >
    </div>
    <div id="navio"></div>
    </div>
  );
 
}
 } 
