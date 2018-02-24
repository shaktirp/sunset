import SunsetWx from 'node-sunsetwx';
import keys from '../config/keys';

const sunsetwx = new SunsetWx(keys);

export function sunsetLogin() {
  const localStorageKey = 'sunsetLoginKey'
  // localStorage.setItem('myData', obj["key"])
  if (!localStorage.getItem(localStorageKey)) {
    sunsetwx.login((err, response, body) => {
      console.log('Got key', body)
      localStorage.setItem(localStorageKey, body['token'])
    })
  } else {
    console.info('Key already present')
  }
}

export function getCoordinates(location, callback) {
  return sunsetwx.coordinates({
    location: location
  }, callback)
}

export function getQuality(coords, type, callback) {
  sunsetwx.quality({
    coords: coords,
    type: type
  }, callback)
}