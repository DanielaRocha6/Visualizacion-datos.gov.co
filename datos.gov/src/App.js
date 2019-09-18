import React from 'react';
import './App.css';
import Navio from './navio';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.url = 'Ingresa url';
    this.state = {
      dataNavio: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  change(e) {

    console.log(`URl es: ${this.url}`)
    this.url = e.target.value;
  }

  handleSubmit(event) {
    let termino = false;
    event.preventDefault();
    alert(`${this.url}`);
    let c = 0;
    let temp = [0];
    while (!termino) {
      fetch(`${this.url}?$limit=1000&$offset=${1000 * c}`)
        .then(req => {
          return req.json();
        })
        .then(data => {
          if (data.length !== 0) {
            console.log(data.length);
            termino=true;
            this.setState({dataNavio : data});
            console.log(this.state.dataNavio);
            // setTimeout(() => {
            //   console.log("Esperando");
            //   temp.concat(data);
            //   console.log(this.state.dataNavio);
            //   c++;
            // }, 2000);

          }
          else {
            termino = true;
            // this.setState({dataNavio : temp});
          }
        });

    }


  }

  render() {
    return (
      <div>
        <div>
          <h1>Visualización datos de datos.gov.co</h1>
          <form className="form-group" onSubmit={this.handleSubmit} >
            <input placeholder="Ingresa una url"
              type="text"
              onChange={this.change.bind(this)} />

            <br />
            <input type="submit" value="CONSULTAR" />
          </form >
        </div>
        {this.state.dataNavio && <Navio data={this.state.dataNavio} />}
      </div>
    );
  }
}


