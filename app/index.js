import React from 'react';
import { render } from 'react-dom';
import Base from './components/Base.jsx';
global.jQuery = require('jquery');
global.$ = require('jquery');
require('bootstrap');

// Where our React app touches our HTML
const entryDiv = document.getElementById('census-portal');

render(<Base />, entryDiv);
