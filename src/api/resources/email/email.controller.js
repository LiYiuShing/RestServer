const jwt = require('jsonwebtoken');
const bcypt = require('bcryptjs');
const { User } = require('../user/user.model');
const {transporter, resetURL, template} = require('../../modules/resetPasswordEmail');

