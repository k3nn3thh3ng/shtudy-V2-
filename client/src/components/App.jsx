import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import HomePage from './HomePage';
import New from './New';
import NewUser from './NewUser';

const App = () => {
	return(
		<div>
			<BrowserRouter>
				<Route path='/' exact component={HomePage} />
				<Route path='/new' exact component={New} />
				<Route path='/newuser' exact component={NewUser} />
			</BrowserRouter>
		</div>
	)
}

export default App