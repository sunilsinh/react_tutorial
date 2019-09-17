import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './Landingpage';
import AboutMe from './Aboutme';
import Contact from './Contact';
import Projects from './Projects';
import Resume from './Resume';
//import Login from './Login';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';


const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/aboutme" component={AboutMe} />
    <Route path="/contact" component={Contact} />
    <Route path="/projects" component={Projects} />
    <Route path="/resume" component={Resume} />
   <Route path="/login" component={LoginForm} />
   <Route path="/register" component={SignupForm} />
  </Switch>
)

export default Main;
