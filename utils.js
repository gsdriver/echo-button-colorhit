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
};

//
// Internal functions
//
