import React from 'react';

const GPSLocation = (props) => {
  const { exif } = props;
  return (
    <div>
      {`${exif.GPSLatitudeRef} ${exif.GPSLatitude[0]}º ${exif.GPSLatitude[1]}' ${exif.GPSLatitude[2]}" ${exif.GPSLongitudeRef} ${exif.GPSLongitude[0]}º ${exif.GPSLongitude[1]}' ${exif.GPSLongitude[2]}"`}
    </div>
  );
};
GPSLocation.propTypes = {
  exif: React.PropTypes.object,
};

export default GPSLocation;
