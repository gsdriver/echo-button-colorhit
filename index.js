//
// Main handler for Alexa echo button color hit skill
//

'use strict';

const AWS = require('aws-sdk');
const Alexa = require('alexa-sdk');
const Launch = require('./intents/Launch');
const GameInput = require('./intents/GameInput');
const Exit = require('./intents/Exit');
const Help = require('./intents/Help');
const resources = require('./resources');

const APP_ID = 'amzn1.ask.skill.04a12ea1-87d2-4fe2-9f4f-a6f300e7f0f9';

// Handlers for our skill
const playRoundHandlers = Alexa.CreateStateHandler('PLAYROUND', {
  'NewSession': function() {
    this.handler.state = '';
    delete this.attributes.STATE;
    this.emitWithState('NewSession');
  },
  'GameEngine.InputHandlerEvent': GameInput.handleIntent,
  'System.ExceptionEncountered': function() {
    // I wonder went went wrong?
    console.log('Samantha says you have an exception!');
  },
  'AMAZON.HelpIntent': Help.handleIntent,
  'AMAZON.StopIntent': Exit.handleIntent,
  'AMAZON.CancelIntent': Exit.handleIntent,
  'SessionEndedRequest': function() {
    this.response.speak(this.t('SESSION_END'));
    this.handler.response.response.shouldEndSession = true;
    this.emit(':responseReady');
  },
  'Unhandled': function() {
    this.response.speak(this.t('UNHANDLED_INTENT')).listen('UNHANDLED_INTENT_REPROMPT');
    this.handler.response.response.shouldEndSession = false;
    this.emit(':responseReady');
  },
});

const handlers = {
  'NewSession': function() {
    if (this.event.request.type === 'IntentRequest') {
      this.emit(this.event.request.intent.name);
    } else {
      this.emit('LaunchRequest');
    }
  },
  'LaunchRequest': Launch.handleIntent,
  'GameEngine.InputHandlerEvent': GameInput.handleIntent,
  'System.ExceptionEncountered': function() {
    // I wonder went went wrong?
    console.log('Samantha says you have an exception!');
  },
  'AMAZON.HelpIntent': Help.handleIntent,
  'AMAZON.StopIntent': Exit.handleIntent,
  'AMAZON.CancelIntent': Exit.handleIntent,
  'SessionEndedRequest': function() {
    this.response.speak(this.t('SESSION_END'));
    this.handler.response.response.shouldEndSession = true;
    this.emit(':responseReady');
  },
  'Unhandled': function() {
    this.response.speak(this.t('UNHANDLED_INTENT')).listen('UNHANDLED_INTENT_REPROMPT');
    this.handler.response.response.shouldEndSession = false;
    this.emit(':responseReady');
  },
};

exports.handler = function(event, context) {
  AWS.config.update({region: 'us-east-1'});
  const alexa = Alexa.handler(event, context);

  alexa.appId = APP_ID;
  alexa.dynamoDBTableName = 'MatchThatColorData';
  alexa.resources = resources.languageStrings;
  alexa.registerHandlers(playRoundHandlers, handlers);
  alexa.execute();
};
