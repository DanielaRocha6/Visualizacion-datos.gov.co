import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navio from './navio';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.url = '';
    this.c = 0;
    this.state = {
      dataNavio: [],
      history: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.obtenerHistory = this.obtenerHistory.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
  }

  change(e) {
    this.url = e.target.value;
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
            res({ termino: true, data: [] });
          }
        } catch (error) {
          rej(error);
        }
      })();
    });

  }

  deleteHistory() {
    fetch('/historico', {
      method: 'DELETE',
      credentials: 'same-origin',
    }).then(data => {
      console.log(data)
      data.json()
    }
      )
      .then((data) => { console.log(`Se borró :) ${data}`,`https://www.datos.gov.co/resource/jhpq-24h2.json`)
      });
      this.obtenerHistory();
  }

  obtenerHistory() {
    let list = [];
    // eslint-disable-next-line
    // this.state.history.length=0;
    fetch('/historico', {
      method: 'GET',
      credentials: 'same-origin',
    }).then(data => data.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          const a = String(data[i].url);
          console.log(data[i].url);
          list.push(a);
        this.setState({history: list});
          // eslint-disable-next-line
          // this.setState(state => {
          //   list = state.history.push(a);
          //   return list;  
          // });
        }
      });
      console.log(this.state.history);
      
  }

  handleClick(event, a) {
    this.url = a;
    this.handleSubmit(event);
  }

  handleSubmit(event) {
    (async () => {
      let termino = false;
      event.preventDefault();
      if (this.url.includes(".co") || this.url.includes(".com")) {
        alert(`Pronto traéremos tus datos de ${this.url}`);
        const a = JSON.stringify({
          "url": this.url
        });
        console.log("buenasssss", a);
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
          ReactDOM.render(<h2> Se han cargado {this.c} páginas del dataset solicitado</h2>, document.getElementById("cargando"));
          const req = await this.doReq(this.c);
          termino = req.termino;
          // console.log(this.c, req.data);
          temp = [...temp, ...req.data];
          this.c++;
        }
        if (termino) {
          this.obtenerHistory();
          ReactDOM.render(<h2> Se han cargado {temp.length} entradas</h2>, document.getElementById("cargando"));
          this.c = 0;
        }
        this.setState({ dataNavio: temp });
      }
      else alert("No es una dirección valida");
    })();
  }

  render() {
    return (
      <div className="centerDiv">
        <div>
          <h1 align="center">Visualización datos de datos.gov.co</h1>
          <form className="form-group" onSubmit={this.handleSubmit} >
            <input placeholder="Ingresa una url"
              type="text"
              onChange={this.change.bind(this)} />
            <br />
            <input id="submit"type="submit" value="CONSULTAR" />
          </form >
          <div id="cargando"></div>
        </div>
        <div>
          {this.state.history.map(item => (
            <button onClick={(e) => this.handleClick(e, `${item}`)}>{item}<br /></button>
          ))}
          <button onClick={this.deleteHistory} id="eliminar">Restablecer histórico</button>
        </div>
        <div id="navio">
          {this.state.dataNavio && <Navio data={this.state.dataNavio} />}
        </div>
      </div>
    );
  }
}


