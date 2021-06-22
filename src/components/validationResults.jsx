import React, {Component} from 'react';

class ValidationResults extends Component {
   state = {}

   render() {
      return (
          <div className={"results"}>
               <p> Passwords does not match </p>
          </div>
      );
   }
}

export default ValidationResults;