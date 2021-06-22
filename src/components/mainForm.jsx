import React, {Component} from 'react';
import Joi from "joi-browser";


class MainForm extends Component {
   state = {
      account: {
         username: "",
         email: "",
         password: "",
         rPassword: "",
         agreement: false,
      },
      errors: {},
   }

   schema = {
      username: Joi.string().min(3).required(),
      email: Joi.string().email({minDomainSegments: 2}).required(),
      password: Joi.string().min(4).regex(/^[a-zA-Z0-9]{3,30}$/),
      rPassword: Joi.ref("password"),
      agreement: Joi.boolean().required().invalid(false)
   }

   handleSubmit = (event) => {
      event.preventDefault();
      this.setState({errors: {}});
      this.resetErrors();
      this.validateForm()
   }

   resetErrors() {
      this.setState({errors: {}})
      if(this.state.account.agreement === false) {
         this.setState({account : {...this.state.account, agreement : ""}})
      }
   }

   handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({account: {...this.state.account, [name]: value}})
      this.validateProperty(name, value);
   }

   validateProperty = (name, value) => {
      console.log(name, value)
      const obj = {[name]: value};
      const schema = {[name]: this.schema[name]};
      const result = Joi.validate(obj, schema);
      if (result.error) {
         this.setState({errors: {...this.state.errors, [name]: result.error.details[0].message}})
      } else {
         this.setState({errors: {...this.state.errors, [name]: ""}})
      }
   }

   handleChecked = (event) => {
      this.setState({account: {...this.state.account, agreement: event.target.checked}})
   }


   validateForm = () => {
      const result = Joi.validate(this.state.account, this.schema, {abortEarly: false})
      console.log(result);

      if (!result.error) {
         return;
      }
      const errors = {};
      // errors.username = result.error.details
      for (let item of result.error.details) {
         errors[item.path[0]] = item.message;
      }
      console.log(errors)
      this.setState({errors: errors})


      // if (this.state.account.username === "") {
      //    this.setState({errors : {username : "cant be blank"}})
      //    return;
      // }
      // if (this.state.account.username.length <=3) {
      //    this.setState({errors : {username : "at least 3 letters"}})
      // }
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
                <input value={this.state.email}
                       onChange={this.handleChange}
                       className={"input" + (this.state.errors.email && "is-invalid")}
                       type="text"
                       id="email"
                       name="email"/>
                {this.state.errors.email && <p className="error-msg">{this.state.errors.email}</p>}
                <label htmlFor="password">Password:</label>
                <input value={this.state.password}
                       onChange={this.handleChange}
                       className={"input" + (this.state.errors.password && "is-invalid")}
                       type="text"
                       id="password"
                       name="password"/>
                {this.state.errors.password && <p className="error-msg">{this.state.errors.password}</p>}
                <label htmlFor="rPassword">Repeat Password:</label>
                <input value={this.state.rPassword}
                       onChange={this.handleChange}
                       className={"input" + (this.state.errors.rPassword && "is-invalid")}
                       type="text"
                       id="rPassword"
                       name="rPassword"/>
                {this.state.errors.rPassword && <p className="error-msg">{this.state.errors.rPassword}</p>}
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
                {this.state.errors.agreement && <p className="error-msg">{this.state.errors.agreement}</p>}
                <button> Submit form</button>
             </form>
          </div>
      );
   }
}

export default MainForm;