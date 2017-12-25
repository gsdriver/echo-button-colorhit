//
// Provides help
//

'use strict';

const utils = require('../utils');

module.exports = {
  handleIntent: function() {
    console.log('Received game event', JSON.stringify(this.event, null, 2));

    const gameEngineEvents = this.event.request.events || [];
    for (let i = 0; i < gameEngineEvents.length; i++) {
      // We should see an event corresponding to button down or timeout
      switch (gameEngineEvents[i].name) {
        case 'button_down_event':
          // id of the button that triggered event
          this.attributes.buttonId = gameEngineEvents[i].inputEvents[0].gadgetId;

          // In case this button just work up, resend launch animation
//              const breathAnimation = utils.buildBreathAnimation('000000', 'ffffff', 30, 1200);
          this.response._addDirective(utils.buildButtonIdleAnimationDirective([this.attributes.buttonId],
//                breathAnimation));
                utils.createRandomAnimation(this, '7fff00', 1000)));
          this.response._addDirective(utils.buildButtonDownAnimationDirective([this.attributes.buttonId]));

          // interrupt previous response if any
          this.handler.state = 'PLAYROUND';
          this.response.speak(this.t('GAME_WELCOME'));
          this.handler.response.response.outputSpeech.playBehavior = 'REPLACE_ALL';
          delete this.handler.response.response.shouldEndSession;
          this.emit(':responseReady');
          break;

        case 'timeout':
          this.response.speak(this.t('GAME_GOODBYE'));
          this.response._addDirective(utils.buttonFadeoutAnimationDirective());
          this.handler.response.response.shouldEndSession = true;
          this.emit(':responseReady');
          break;
      }
    }
  },
};
