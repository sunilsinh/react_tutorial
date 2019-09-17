import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class SignupForm extends React.Component {
  state = {
    data: {
      fname: "",
      lname: "",
	  email: "",
      phone : "",
	  password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
	
    if (!isEmail(data.email)) errors.email = "Please enter valid email id";
    if (!data.fname) errors.fname = "Can't be blank";
    if (!data.lname) errors.lname = "Can't be blank";
    if (!data.phone || data.phone.length > 10) errors.phone = "Please enter 10 digit";
    if (!data.password) errors.password = "Can't be blank";

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        
		<Form.Field error={!!errors.fname}>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="First name"
            value={data.fname}
            onChange={this.onChange}
          />
          {errors.fname && <InlineError text={errors.fname} />}
        </Form.Field>
		
		<Form.Field error={!!errors.lname}>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Last name"
            value={data.lname}
            onChange={this.onChange}
         />
          {errors.lname && <InlineError text={errors.lname} />}
        </Form.Field>
		<Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@email.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
		
		<Form.Field error={!!errors.phone}>
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="Mobile Number"
			maxLength = "10"
            value={data.phone}
            onChange={this.onChange}
         />
		 {errors.phone && <InlineError text={errors.phone} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
