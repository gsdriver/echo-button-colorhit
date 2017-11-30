//
// Provides help
//

'use strict';

module.exports = {
  handleIntent: function() {
    // Set up a directive so we listen to the button down event
    // As part of launch, we ask them to press the button so we know
    // they are there and ready to play.  We will stop listening for the
    // button event so we can replace with a different directive once
    // we're ready to start game play
    this.response._addDirective({
      'type': 'GameEngine.StartInputHandler',
      'timeout': 10000,
      'recognizers': {
        'button_down_recognizer': {
          'type': 'match',
          'fuzzy': false,
          'anchor': 'end',
          'pattern': [{
            'action': 'down',
          }],
        },
      },
      'events': {
        'button_down_event': {
          'meets': ['button_down_recognizer'],
          'reports': 'matches',
          'shouldEndInputHandler': true,
        },
        'timeout': {
          'meets': ['timed out'],
          'reports': 'history',
          'shouldEndInputHandler': true,
        },
      },
    });

    // Make the button solid white until it's pressed
    this.response._addDirective({
      'type': 'GadgetController.SetLight',
      'version': 1,
      'targetGadgets': [],
      'parameters': {
        'animations': [{
          'repeat': 1,
          'targetLights': ['1'],
          'sequence': [{
             'durationMs': 1000,
             'color': '000000',
             'intensity': 255,
             'blend': true,
           }],
        }],
        'triggerEvent': 'none',
        'triggerEventTimeMs': 0,
      },
    });

    this.response.speak(this.t('LAUNCH_WELCOME')).listen('LAUNCH_WELCOME_REPROMPT');
    this.handler.response.response.shouldEndSession = false;
    this.emit(':responseReady');
  },
};
