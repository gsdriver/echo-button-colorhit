// Localized resources

const resources = {
  'en-US': {
    'translation': {
      // From index.js
      'UNHANDLED_INTENT': 'Sorry, I didn\'t get that. Try saying help.',
      'UNHANDLED_INTENT_REPROMPT': 'Try saying help.',
      'SESSION_END': 'Goodbye.',
      // From Gameinput.js
      'GAME_GOODBYE': 'Thank you for playing!',
      'GAME_WELCOME': 'Great <break time=\'200ms\'/> I will say a color and your button will start to flash different colors. <break time=\'200ms\'/> When your button color matches what I said, press it!  Sounds easy?  Well, each round there will be less time between color changes on your button! See how many rounds you can complete!',
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
      // Colors
      'COLOR_BLACK': 'black',
      'COLOR_BLUE': 'blue',
      'COLOR_BROWN': 'brown',
      'COLOR_CHARTREUSE': 'chartreuse',
      'COLOR_GRAY': 'gray',
      'COLOR_GREEN': 'green',
      'COLOR_MAROON': 'maroon',
      'COLOR_ORANGE': 'orange',
      'COLOR_PINK': 'pink',
      'COLOR_PURPLE': 'purple',
      'COLOR_RED': 'red',
      'COLOR_SIENNA': 'sienna',
      'COLOR_SILVER': 'silver',
      'COLOR_WHITE': 'white',
      'COLOR_YELLOW': 'yellow',
    },
  },
};

module.exports = {
  languageStrings: resources,
};
