import React from 'react';
import navio from 'navio';

export default class Navio extends React.Component{ 
    constructor(props) {
        super(props);
      }
      componentDidMount() {
          
      }
      loadNavio(){
        const nv = navio(this.mydiv, 600);
        // NAVIO Step 2. Load your data!
        nv.data(data);
    
        // NAVIO Step 3. Detect your attributes (or load them manually)
        nv.addAllAttribs();
    
        // Optional, setup a selection callback
        nv.updateCallback( selected => console.log("selected in Navio: ", selected.length));
      }
   
}

