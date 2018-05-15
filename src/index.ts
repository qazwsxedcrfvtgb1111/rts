import './styles.css';
import { Startup } from './Startup';
import 'normalize.css';
import appConfig from '../config/app-config';

const App = new Startup(appConfig);
App.main();
