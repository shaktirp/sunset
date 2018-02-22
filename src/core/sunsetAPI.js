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

export function getCoordinates() {
  sunsetwx.coordinates({
    location: 'Rochester, NY'
  }, (err, response, body) => {
    if (!err) {
      const xCoordinate = body["features"][0]["geometry"]["coordinates"][0]
      const yCoordinate = body["features"][0]["geometry"]["coordinates"][1]

      const coords = xCoordinate + "," + yCoordinate
      getQuality(coords, 'sunset')
      getQuality(coords, 'sunrise')
    }
  })
}

function getQuality(coords, type) {
  sunsetwx.quality({
    coords: coords,
    type: type
  }, (err, response, body) => {
    console.log(err, response, body)
  })
}
