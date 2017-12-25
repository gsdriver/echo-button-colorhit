//
// Utility functions
//

'use strict';

module.exports = {
  getSlotValues: function(filledSlots) {
    const slotValues = {};

    Object.keys(filledSlots).forEach((item) => {
      const name = filledSlots[item].name;

      if(filledSlots[item]&&
         filledSlots[item].resolutions &&
         filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
         filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
         filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code ) {
        switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
          case 'ER_SUCCESS_MATCH':
            slotValues[name] = {
                'synonym': filledSlots[item].value,
                'resolved': filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                'isValidated': filledSlots[item].value == filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            };
            break;
          case 'ER_SUCCESS_NO_MATCH':
            slotValues[name] = {
                'synonym': filledSlots[item].value,
                'resolved': filledSlots[item].value,
                'isValidated': false,
            };
            break;
        }
      } else {
        slotValues[name] = {
            'synonym': filledSlots[item].value,
            'resolved': filledSlots[item].value,
            'isValidated': false,
        };
      }
    });

    return slotValues;
  },
  pickRandomColor: function(context, avoidColor) {
    const colors = {
      'COLOR_BLACK': '000000',
      'COLOR_BLUE': '0000ff',
      'COLOR_BROWN': 'a52a2a',
      'COLOR_CHARTREUSE': '7fff00',
      'COLOR_GRAY': '808080',
      'COLOR_GREEN': '008000',
      'COLOR_MAROON': '800000',
      'COLOR_ORANGE': 'ffa500',
      'COLOR_PINK': 'ffc0cb',
      'COLOR_PURPLE': '800080',
      'COLOR_RED': 'ff0000',
      'COLOR_SIENNA': 'a0522d',
      'COLOR_SILVER': 'c0c0c0',
      'COLOR_WHITE': 'ffffff',
      'COLOR_YELLOW': 'ffff00',
    };
    const colorList = [];
    let randomColor;

    Object.keys(colors).forEach((color) => {
      colorList.push(color);
    });

    do {
      randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    } while (avoidColor === colors[randomColor]);

    return ({color: context.t(randomColor), rgb: colors[randomColor]});
  },
  createRandomAnimation: function(context, matchColor, oneStepDuration) {
    // First, random number of items in sequence - from 5 to 15
    const steps = 5 + Math.floor(Math.random() * 10);
    const result = [];

    for (let i = 0; i < steps; i++) {
      result.push({
        'durationMs': oneStepDuration,
        'color': module.exports.pickRandomColor(context, matchColor).rgb,
        'intensity': 255,
        'blend': true,
      });
    }

    const matchPosition = Math.floor(Math.random() * result.length);
    result.splice(matchPosition, 0, {
      'durationMs': oneStepDuration,
      'color': matchColor,
      'intensity': 255,
      'blend': true,
    });

    console.log('Random animation: ' + JSON.stringify(result));
    return result;
  },
  // build 'button down' animation directive
  // animation will overwrite default 'button down' animation
  buildButtonDownAnimationDirective: function(targetGadgets) {
    return {
      'type': 'GadgetController.SetLight',
      'version': 1,
      'targetGadgets': targetGadgets,
      'parameters': {
        'animations': [{
          'repeat': 1,
          'targetLights': ['1'],
          'sequence': [{
            'durationMs': 300,
            'color': 'FFFF00',
            'intensity': 255,
            'blend': false,
          }],
        }],
        'triggerEvent': 'buttonDown',
        'triggerEventTimeMs': 0,
      },
    };
  },
  // build idle animation directive
  buildButtonIdleAnimationDirective: function(targetGadgets, animation) {
    return {
      'type': 'GadgetController.SetLight',
      'version': 1,
      'targetGadgets': targetGadgets,
      'parameters': {
        'animations': [{
          'repeat': 100,
          'targetLights': ['1'],
          'sequence': animation,
        }],
        'triggerEvent': 'none',
        'triggerEventTimeMs': 0,
      },
    };
  },
  buildBreathAnimation: function(fromRgbHex, toRgbHex, steps, totalDuration) {
    const halfSteps = steps / 2;
    const halfTotalDuration = totalDuration / 2;
    return buildSeqentialAnimation(fromRgbHex, toRgbHex, halfSteps, halfTotalDuration)
      .concat(buildSeqentialAnimation(toRgbHex, fromRgbHex, halfSteps, halfTotalDuration));
  },
  // fadeout animation directive
  buttonFadeoutAnimationDirective: function() {
    return {
      'type': 'GadgetController.SetLight',
      'version': 1,
      'targetGadgets': [],
      'parameters': {
        'animations': [{
          'repeat': 1,
          'targetLights': ['1'],
          'sequence': [{
            'durationMs': 1,
            'color': 'FFFFFF',
            'intensity': 255,
            'blend': true,
          }, {
            'durationMs': 1000,
            'color': '000000',
            'intensity': 255,
            'blend': true,
          }],
        }],
        'triggerEvent': 'none',
        'triggerEventTimeMs': 0,
      },
    };
  },
};

//
// Internal functions
//

const buildSeqentialAnimation = function(fromRgbHex, toRgbHex, steps, totalDuration) {
  const fromRgb = parseInt(fromRgbHex, 16);
  let fromRed = fromRgb >> 16;
  let fromGreen = (fromRgb & 0xff00) >> 8;
  let fromBlue = fromRgb & 0xff;

  const toRgb = parseInt(toRgbHex, 16);
  const toRed = toRgb >> 16;
  const toGreen = (toRgb & 0xff00) >> 8;
  const toBlue = toRgb & 0xff;

  const deltaRed = (toRed - fromRed) / steps;
  const deltaGreen = (toGreen - fromGreen) / steps;
  const deltaBlue = (toBlue - fromBlue) / steps;

  const oneStepDuration = Math.floor(totalDuration / steps);

  const result = [];

  for (let i = 0; i < steps; i++) {
    result.push({
      'durationMs': oneStepDuration,
      'color': rgb2h(fromRed, fromGreen, fromBlue),
      'intensity': 255,
      'blend': true,
    });
    fromRed += deltaRed;
    fromGreen += deltaGreen;
    fromBlue += deltaBlue;
  }

  return result;
};

const rgb2h = function(r, g, b) {
  return '' + n2h(r) + n2h(g) + n2h(b);
};

// number to hex with leading zeroes
const n2h = function(n) {
  return ('00' + (Math.floor(n)).toString(16)).substr(-2);
};
