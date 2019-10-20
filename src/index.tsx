import '../public/css/flexboxgrid.min.css';
import '../public/css/style.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { fetchSettings } from './modules/settings/actions';
import settings from './lib/settings';
import * as auth from './lib/auth';
import { connectToWebSocket } from './lib/apiWebSocket';
import reducers from './rootReducer';
import App from './App';

const DEVELOPER_MODE = settings.developerMode === true;
if (DEVELOPER_MODE === false) {
	auth.validateCurrentToken();
}

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
store.dispatch(fetchSettings() as unknown as AnyAction);

if (window.WebSocket) {
	connectToWebSocket(store);
} else {
	console.log('WebSocket is not supported by your browser.');
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
