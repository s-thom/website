import React, { PropTypes } from 'react';

import './index.global.css';
import './highlight.global.css';

import Container from '../Container';
import DefaultHeadMeta from '../DefaultHeadMeta';
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';

const AppContainer = (props) => (
  <Container>
    <DefaultHeadMeta />
    <Header />
    <Content>
      { props.children }
    </Content>
    <Footer />
  </Container>
);

AppContainer.propTypes = {
  children: PropTypes.node,
};

export default AppContainer;
