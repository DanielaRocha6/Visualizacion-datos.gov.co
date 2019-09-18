import React from 'react';
import navio from 'navio';
import PropTypes from 'prop-types';

export default class Navio extends React.Component{ 
    constructor(props) {
        super(props);
        this.refDiv = React.createRef();
      }

    //   componentDidMount() {
    //       this.loadNavio();
    //   }

      componentDidUpdate() {
          this.loadNavio();
        // console.log(this.props.data);
        
      }

      loadNavio(){
        const nv = navio(this.refDiv.current);
        nv.data(this.props.data);
        nv.addAllAttribs();

        nv.updateCallback( selected => console.log("selected in Navio: ", selected.length));
      }
   
      render(){
        console.log(this.props.data);
        
          return(
            <div ref={this.refDiv}></div>
          );
      }
}
Navio.propTypes = {
    data : PropTypes.array
}

