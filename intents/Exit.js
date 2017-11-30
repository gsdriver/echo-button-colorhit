//
// Exit the skill
//

'use strict';

module.exports = {
  handleIntent: function() {
    this.response.speak(this.t('EXIT_GOODBYE'));
    this.handler.response.response.shouldEndSession = true;
    this.emit(':responseReady');
  },
};
