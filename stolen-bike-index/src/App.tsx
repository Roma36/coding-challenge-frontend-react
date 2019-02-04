import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './pages/index/Index';
import Details from './pages/details/Details';

const AppWrapper = styled.div``;

const Header = styled.header`
  background: url(/img/illustration.png) center repeat;
  background-size: contain;
  height: 200px;
  display: flex;
  color: #fff;
  padding: 2%;

  h1,
  h2 {
    margin: 0;
  }
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

const HeadingWrapper = styled.div`
  display: inline-block;
  margin-left: 15px;
`;

const Heading = styled.div`
  background: #000;
  opacity: 0.9;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <AppWrapper>
          <Header>
            <Logo src="/img/police-logo.svg" />
            <HeadingWrapper>
              <Heading>
                <h1>Police Department of Berlin</h1>
                <h2>Stolen bikes</h2>
              </Heading>
            </HeadingWrapper>
          </Header>

          <Route exact path="/" component={Index} />
          <Route path="/details/:id" component={Details} />
        </AppWrapper>
      </Router>
    );
  }
}

export default App;
