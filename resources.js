// Localized resources

const resources = {
  'en-US': {
    'translation': {
      // From index.js
      'UNHANDLED_INTENT': 'Sorry, I didn\'t get that. Try saying help.',
      'UNHANDLED_INTENT_REPROMPT': 'Try saying help.',
      'SESSION_END': 'Goodbye.',
      // From Launch.js
      'LAUNCH_WELCOME': 'Welcome to Match That Color. Press your echo button to join in and start playing!',
      'LAUNCH_WELCOME_REPROMPT': 'Press your echo button to play.',
      // From Exit.js
      'EXIT_GOODBYE': 'Goodbye.',
      // From utils.js
      'ERROR_REPROMPT': 'What else can I help with?',
      // From Help.js
      'HELP_TEXT': 'I will speak a color name and you push the button when it lights up that color. Push your button to play.',
      'HELP_REPROMPT': 'Push your button to play.',
    },
  },
};

module.exports = {
  languageStrings: resources,
};
