import obj from '../model/data.json';
import SunsetWx from 'node-sunsetwx';

const sunsetwx = new SunsetWx(obj);

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

export function getQuality(coords, type) {
  sunsetwx.quality({
    coords: coords,
    type: type
  }, (err, response, body) => {
    const props = body["features"][0]["properties"]
    console.log(props['type'], props['quality'], props['temperature'])
  })
}
