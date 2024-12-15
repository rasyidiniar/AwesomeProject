/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './CrudMahasiswaNav';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'; // Pastikan ini ada di bagian atas file entry point Anda (biasanya index.js atau App.js)

AppRegistry.registerComponent(appName, () => App);
