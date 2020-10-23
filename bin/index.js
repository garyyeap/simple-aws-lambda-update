#!/usr/bin/env node

const argv = require('simple-argv');
const update = require('../index');

update(argv.name, argv['keep-zip'], argv['dev-deps']);
