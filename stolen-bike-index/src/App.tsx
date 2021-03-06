import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './pages/index/Index';
import Details from './pages/details/Details';
import NotFound from './pages/not-found/NotFound';
import config from './config';

const AppWrapper = styled.div``;

const Header = styled.header`
  background: url(${config.publicUrl + '/img/illustration.png'}) center repeat;
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

const ContentWrapper = styled.div`
  padding: 2% 15% 2% 2%;
`;

export class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <AppWrapper>
          <Header>
            <Logo src={config.publicUrl + '/img/police-logo.svg'} />
            <HeadingWrapper>
              <Heading>
                <h1>Police Department of Berlin</h1>
                <h2>Stolen bikes</h2>
              </Heading>
            </HeadingWrapper>
          </Header>

          <ContentWrapper>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/case/:id(\d+)" component={Details} />
              <Route component={NotFound} />
            </Switch>
          </ContentWrapper>
        </AppWrapper>
      </Router>
    );
  }
}

export default App;
