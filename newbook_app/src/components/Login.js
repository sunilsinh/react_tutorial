import React, { Component } from 'react';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	
	handleFormSubmit(e){
        console.log('aaa');
		 e.preventDefault()
    }
	handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
	render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                   <form onSubmit = {this.handleFormSubmit } >
                        <input
                            className="form-item"
                            placeholder="Username"
                            name="username"
                            type="text"
							onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                           onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }

    
}

export default Login;