'use strict';

const express = require('express'),
      compression = require('compression');

const app = express();

app.disable('x-powered-by');

app.use(compression());

app.use(express.static('public'));

app.listen('3000', function() {
  console.log('http://localhost:3000');
});
