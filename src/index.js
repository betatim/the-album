import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AlbumApp from './App';
import './index.css';

ReactDOM.render(
  <MuiThemeProvider>
    <AlbumApp />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
