import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardText, CardMedia, CardTitle, CardActions } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import './App.css';


class AlbumApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocusItem = this.handleFocusItem.bind(this);
    this.handleUnFocus = this.handleUnFocus.bind(this);
    this.state = {
      items: [],
      text: '',
      focussed: null,
    };
  }

  handleFocusItem(id) {
    this.setState({
      focussed: id,
    });
  }
  handleUnFocus() {
    this.setState({
      focussed: null,
    });
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      text: this.state.text,
      id: Date.now(),
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: '',
    }));
  }

  render() {
    const focusItem = this.state.items.find(
      e => (e.id === this.state.focussed));
    return (
      <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header mdl-layout__header--scroll">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">The Album</span>
          </div>
        </header>
        <main className="mdl-layout__content">
          <div
            style={{
              padding: '8px',
              paddingTop: '48px',
              paddingBottom: '48px',
              margin: 'auto',
              maxWidth: '900px' }}
          >
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} value={this.state.text} />
              <button>{'Add #' + (this.state.items.length + 1)}</button>
            </form>
            <hr />
            {this.state.focussed ?
              <FocussedItem
                item={focusItem}
                onClick={this.handleUnFocus}
              />
              :
              <ImageList
                items={this.state.items}
                handleFocus={this.handleFocusItem}
              />
            }
          </div>
        </main>
        <footer className="mdl-mini-footer">
          <div className="mdl-mini-footer__left-section">
            <div className="mdl-logo">The Album</div>
            <ul className="mdl-mini-footer__link-list">
              <li><a href="#">Help</a></li>
              <li><a href="#">Privacy & Terms</a></li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}


const ImageList = props => {
  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      overflowY: 'auto',
    },
  };
  return (
    <GridList
      cols={4}
      style={styles.gridList}
    >
      {props.items.map(item => (
        <GridTile
          key={item.id}
          title={item.text}
          onClick={() => props.handleFocus(item.id)}
        >
          <img
            alt={item.text}
            src="http://indianapublicmedia.org/eartheats/files/2009/12/bicycle.jpg"
          />
        </GridTile>
      ))}
    </GridList>);
};

const FocussedItem = (props) => {
  const item = props.item;
  return (
    <Card>
      <CardMedia>
        <img
          alt={item.text}
          src="http://indianapublicmedia.org/eartheats/files/2009/12/bicycle.jpg"
        />
      </CardMedia>
      <CardTitle title={item.text} />
      <CardText>
        <List>
          <ListItem disabled primaryText="Date" secondaryText="23 Dec 2016 12:34:56" />
          <ListItem disabled primaryText="Location" secondaryText="Geneva, Switzerland" />
          <ListItem disabled primaryText="Make" secondaryText="Canon" />
        </List>
      </CardText>
      <CardActions className="mdl-card__actions">
        <FlatButton primary label="Minimise" onClick={() => props.onClick()} />
      </CardActions>
    </Card>
  );
};


export default AlbumApp;
