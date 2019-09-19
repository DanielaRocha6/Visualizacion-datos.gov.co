import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navio from './navio';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.url = 'Ingresa url';
    this.c =0;
    this.state = {
      dataNavio: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  change(e) {
    this.url = e.target.value;
    console.log(`URl es: ${this.url}`)
  }

  doReq(c) {
    return new Promise((res, rej) => {
      (async () => {
        try {
          const req = await fetch(`${this.url}?$limit=1000&$offset=${1000 * this.c}`);
          const data = await req.json();

          if (data.length !== 0) {
            res({ termino: false, data });
          }
          else {
            res({ termino: true, data:[] });
            this.c=0;
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
      alert(`Pronto traéremos tus datos de ${this.url}`);
      const a = JSON.stringify({
        "url": this.url
      });
      console.log("buenasssss",a);
      fetch('/historico/url', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "url": this.url
        })
      });
      let temp = [];
      while (!termino) {
        ReactDOM.render(<h3> Este dataset tiene {this.c} páginas</h3>, document.getElementById("cargando"));
        const req = await this.doReq(this.c);
        termino = req.termino;
        console.log(this.c, req.data);
        temp = [...temp, ...req.data];
        this.c++;
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
          <div id="cargando"></div>
        </div>
        {this.state.dataNavio && <Navio data={this.state.dataNavio} />}
      </div>
    );
  }
}


