import React from 'react';
import ReactDOM from 'react-dom';

import 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, {FirebaseContext} from './components/Firebase'
import GoogleMaps from './components/Maps'

ReactDOM.render(
<FirebaseContext.Provider value={new Firebase()}>

 <App/>

 </FirebaseContext.Provider>, document.getElementById('root'));


serviceWorker.unregister();

