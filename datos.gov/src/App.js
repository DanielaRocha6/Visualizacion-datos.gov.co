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

  doReq(c) {
    return new Promise((res, rej) => {
      (async () => {
        try {
          const req = await fetch(`${this.url}?$limit=100&$offset=${1000 * c}`);
          const data = await req.json();

          if (data.length !== 0) {
            res({ termino: false, data });
          }
          else {
            res({ termino: true, data:[] });
          }
        } catch (error) {
          rej(error);
        }
      })();
    });

  }

  handleSubmit(event) {
    (async () => {

      let termino = false;
      event.preventDefault();
      alert(`${this.url}`);
      let c = 0;
      let temp = [];
      while (!termino) {
        const req = await this.doReq(c);
        termino = req.termino;
        console.log(req.data);
        temp = [...temp, ...req.data];
        c++;
      }
      
      this.setState({dataNavio:temp});
    })();
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


