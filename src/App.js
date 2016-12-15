import React, { Component } from 'react';

import { GridList, GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

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
      <div style={{ margin: 'auto', maxWidth: '900px' }}>
        <div>
          <h3>TODO</h3>
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
            <TodoList
              items={this.state.items}
              handleFocus={this.handleFocusItem}
            />
          }
        </div>
      </div>
    );
  }
}


const TodoList = props => {
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
  const style = {
    margin: 20,
    textAlign: 'left',
    //display: 'inline-block',
    padding: '0 10px',
  };
  const item = props.item;
  return (
    <Paper style={style} zDepth={1} onClick={() => props.onClick()}>
      <img
        alt={item.text}
        src="http://indianapublicmedia.org/eartheats/files/2009/12/bicycle.jpg"
      />
      <h2>{item.text}</h2>
      <p>Lorem ipsum dolor.</p>
    </Paper>
  );
};


export default AlbumApp;
