import React, {Component} from 'react';


class MainForm extends Component {
   state = {
      account: {
         username: "",
         email: "",
         password: "",
         rPassword: "",
         agreement: "",
      },
      errors: {

      },
   }

   handleSubmit = (event) => {
      event.preventDefault();
      console.log("paspausta");
      this.setState({errors: {}});
      this.validateForm()
   }

   handleChange = (event) => {
      console.log(event)
      this.setState({account: {...this.state.account, [event.target.name]: event.target.value}})
   }

   handleChecked = (event) => {
      this.setState({account: {...this.state.account, agreement: event.target.checked}})
   }

   validateForm = () => {
      if (this.state.account.username === "") {
         this.setState({errors : {username : "cant be blank"}})
         return;
      }
      if (this.state.account.username.length <=3) {
         this.setState({errors : {username : "at least 3 letters"}})
      }
   }

   render() {
      return (
          <div className={"main-form"}>
             <h1> Main form </h1>
             <form className={"first-form"} onSubmit={this.handleSubmit}>
                <label htmlFor="username"> Username: </label>
                <input value={this.state.username}
                       onChange={this.handleChange}
                       className={"input" + (this.state.errors.username && "is-invalid")}
                       type="text"
                       id="username"
                       name="username"/>
                {this.state.errors.username && <p className="error-msg">{this.state.errors.username}</p>}

                <label htmlFor="email"> email: </label>
                <input value={this.state.email} onChange={this.handleChange} className="input" type="text" id="email"
                       name="email"/>
                <label htmlFor="password">Password:</label>
                <input value={this.state.password} onChange={this.handleChange} className="input" type="text"
                       id="password" name="password"/>
                <label htmlFor="rPassword">Repeat Password:</label>
                <input value={this.state.rPassword} onChange={this.handleChange} className="input" type="text"
                       id="rPassword" name="rPassword"/>
                <div className="check-group">
                   <input
                       onChange={this.handleChecked}
                       value={this.state.agreement}
                       type="checkbox"
                       name="agreement"
                       id="agreement"
                   />
                   <label htmlFor="agreement">Agree?</label>
                </div>
                <button> Submit form</button>
             </form>
          </div>
      );
   }
}

export default MainForm;