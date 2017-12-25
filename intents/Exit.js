//
// Exit the skill
//

'use strict';

const utils = require('../utils');

module.exports = {
  handleIntent: function() {
    this.response.speak(this.t('EXIT_GOODBYE'));
    this.response._addDirective(utils.buttonFadeoutAnimationDirective);
    this.handler.response.response.shouldEndSession = true;
    this.emit(':responseReady');
  },
};
