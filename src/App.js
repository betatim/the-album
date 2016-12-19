import React, { Component } from 'react';

import Immutable from 'immutable';

import DropZone from 'react-dropzone';

import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardText, CardMedia, CardTitle, CardActions } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

import EXIF from 'exif-js';

import './App.css';


class AlbumApp extends Component {
  constructor(props) {
    super(props);
    this.handleFocusItem = this.handleFocusItem.bind(this);
    this.handleUnFocus = this.handleUnFocus.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = {
      items: Immutable.List(),
      focussed: null,
      exifInfo: Immutable.Map(),
    };
  }

  handleFocusItem(name) {
    this.setState({ focussed: name });
  }
  handleUnFocus() {
    this.setState({ focussed: null });
    // this.setState(state => (state.update('focussed', () => null)));
  }

  handleDrop(files) {
    this.setState(({ items }) => (
      { items: items.concat(files) }
    ));
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const exif = EXIF.readFromBinaryFile(e.target.result);
        this.setState(({ exifInfo }) => (
          { exifInfo: exifInfo.set(file.name, exif) }
        ));
      };
      reader.onloadend.bind(this);
      reader.readAsArrayBuffer(file);
    });
  }

  render() {
    const { items, focussed, exifInfo } = this.state;
    const focusItem = items.find(
      e => (e.name === focussed));
    const DZstyle = {
      height: 200,
      borderWidth: 2,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 10,
    };
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
            <DropZone onDrop={this.handleDrop} style={DZstyle}>
              <div>Try dropping some files here, or click to select
                files to upload.
              </div>
            </DropZone>
            <hr />
            {focussed ?
              <FocussedItem
                item={focusItem}
                exif={exifInfo.get(focusItem.name)}
                onClick={this.handleUnFocus}
              />
              :
              <ImageList
                items={items}
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
          key={item.name + item.size}
          title={item.name}
          onClick={() => props.handleFocus(item.name)}
        >
          <img
            alt={item.name}
            src={item.preview}
          />
        </GridTile>
      ))}
    </GridList>);
};

const FocussedItem = (props) => {
  window.URL = window.URL || window.webkitURL;
  const item = props.item;
  const exif = props.exif;
  var img = document.createElement("img");
  img.src = window.URL.createObjectURL(item);
  const height = img.height;
  const width = img.width;
  window.URL.revokeObjectURL(img.src);
  console.log(exif);
  return (
    <Card>
      <CardMedia>
        <img
          alt={item.name}
          src={item.preview}
        />
      </CardMedia>
      <CardTitle title={item.name} />
      <CardText>
        <List>
          <ListItem
            disabled
            primaryText="Date (plain, original, digitized, GPS)"
            secondaryText={
              `${exif.DateTime}, ${exif.DateTimeOriginal}, ${exif.DateTimeDigitized}, ${exif.GPSDateStamp}`
            }
          />
          <ListItem
            disabled
            primaryText="Location (Latitude / Longitude)"
            secondaryText={
              exif.GPSLatitude ?
              `${exif.GPSLatitude[2]} / ${exif.GPSLongitude[2]}`
              :
              `No GPS information.`}
          />
          <ListItem
            disabled
            primaryText="Make and Model"
            secondaryText={`${exif.Make} / ${exif.Model}`}
          />
          <ListItem
            disabled
            primaryText="Exposure, F number, Focal length"
            secondaryText={`${exif.ExposureTime}, ${exif.FNumber}, ${exif.FocalLength}`}
          />
          <ListItem
            disabled
            primaryText="Flash"
            secondaryText={`${exif.Flash}`}
          />
          <ListItem
            disabled
            primaryText="ISO"
            secondaryText={`${exif.ISOSpeedRatings}`}
          />
          <ListItem
            disabled
            primaryText="Recorded and actual image size"
            secondaryText={`${exif.PixelXDimension}x${exif.PixelYDimension} and ${width}x${height}`}
          />
        </List>
      </CardText>
      <CardActions className="mdl-card__actions">
        <FlatButton primary label="Minimise" onClick={() => props.onClick()} />
      </CardActions>
    </Card>
  );
};


export default AlbumApp;
