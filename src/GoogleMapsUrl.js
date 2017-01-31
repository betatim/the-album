import React from 'react';

import { toDecimal } from './utils';

const GoogleMapsUrl = (props) => {
  const { exif } = props;
  const latitude = toDecimal(exif.GPSLatitude, exif.GPSLatitudeRef);
  const longitude = toDecimal(exif.GPSLongitude, exif.GPSLongitudeRef);

  const proto = 'https:';
  const Z = '10';
  const type = 'm';

  return (
    <a
      target="_blank"
      rel="noreferrer noopener"
      href={proto + '//maps.google.com/maps?z=' + Z + '&t=' + type + '&q=loc:' + latitude + '+' + longitude}
      >
        View on map
    </a>);
};
GoogleMapsUrl.propTypes = {
  exif: React.PropTypes.object,
};

export default GoogleMapsUrl;
