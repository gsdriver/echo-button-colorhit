//
// Main handler for Alexa echo button color hit skill
//

'use strict';

const AWS = require('aws-sdk');
const Alexa = require('alexa-sdk');
const Launch = require('./intents/Launch');
const Exit = require('./intents/Exit');
const Help = require('./intents/Help');

const APP_ID = 'amzn1.ask.skill.5fdf0343-ea7d-40c2-8c0b-c7216b98aa04';

// Handlers for our skill
const handlers = {
  'NewSession': function() {
    if (this.event.request.type === 'IntentRequest') {
      this.emit(this.event.request.intent.name);
    } else {
      this.emit('LaunchRequest');
    }
  },
  'LaunchRequest': Launch.handleIntent,
  'AMAZON.HelpIntent': Help.handleIntent,
  'AMAZON.StopIntent': Exit.handleIntent,
  'AMAZON.CancelIntent': Exit.handleIntent,
  'SessionEndedRequest': function() {
    this.response.speak(this.t('SESSION_END'));
    this.handler.response.response.shouldEndSession = true;
    this.emit(':responseReady');
  },
  'Unhandled': function() {
    this.response.speak(this.t('UNKNOWN_INTENT')).listen('UNKNOWN_INTENT_REPROMPT');
    this.handler.response.response.shouldEndSession = false;
    this.emit(':responseReady');
  },
};

exports.handler = function(event, context) {
  AWS.config.update({region: 'us-east-1'});
  const alexa = Alexa.handler(event, context);

  alexa.appId = APP_ID;
  alexa.dynamoDBTableName = 'EchoButtonColorHitData';
  alexa.resources = resources.languageStrings;
  alexa.registerHandlers(handlers, sayNameHandlers, confirmNameHandlers);
  alexa.execute();
};
