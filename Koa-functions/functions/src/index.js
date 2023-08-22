import * as functions from 'firebase-functions';
import app from './App/app';

exports.api = functions.https.onRequest(app.callback());