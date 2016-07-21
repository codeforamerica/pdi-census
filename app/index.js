import React from 'react';
import { render } from 'react-dom';
import Base from './components/Base.jsx';

// Where our React app touches our HTML
const entryDiv = document.getElementById('census-portal');

render(<Base />, entryDiv);
