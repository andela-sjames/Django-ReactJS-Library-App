import configureDevStore from './devConfig';
import configureProdStore from './prodConfig';

export default process.env.NODE_ENV === 'production' ? configureProdStore() : configureDevStore()
