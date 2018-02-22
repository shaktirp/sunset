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

  // sunsetwx.coordinates({
  //   location: 'Rochester, NY'
  // }, callback)


}
