import React, { Component } from 'react';

import {GridList, GridTile} from 'material-ui/GridList';

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
      <div>
        <h3>TODO</h3>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        {this.state.focussed ?
          <TodoItem
            item={focusItem}
            onClick={this.handleUnFocus}
          />
          :
          <TodoList
            items={this.state.items}
            handleFocus={this.handleFocusItem}
          />
        }
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 800,
    overflowY: 'auto',
  },
};
const TodoList = props => (
  <GridList
    cols={4}
    // cellHeight={180}
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
  </GridList>
);

const TodoItem = (props) => {
  const item = props.item;
  return (<li onClick={() => props.onClick()}>{item.text}</li>);
};


export default AlbumApp;
