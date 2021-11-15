import React from 'react'
import HeaderComponent from './components/headerComponent'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Container } from '@mui/material';
import Routes from './routes';
import Providers from './Providers';

function App() {

  return (
    <Providers >
      <Router>
        <HeaderComponent />
        <Container>
          <Routes />
        </Container>
      </Router>
    </Providers>
  )
}

export default App
