//
// Provides help
//

'use strict';

module.exports = {
  handleIntent: function() {
    this.response.speak(this.t('HELP_TEXT')).listen('HELP_REPROMPT');
    this.handler.response.response.shouldEndSession = false;
    this.emit(':responseReady');
  },
};
