const allInverters = require('./allInverters');

function getPotentialInverters() {
  const stringInverters = Object.values(allInverters).filter((inverter) => inverter.sort === 'string');
  const selectRelevantFields = ({
    ID, trackers, trackerDetails, available, phases, ACpower, ACcurrent,
  }) => ({
    ID, trackers, trackerDetails, available, phases, ACpower, ACcurrent,
  });
  const result = stringInverters.map((inverter) => selectRelevantFields(inverter));
  return result;
}

/**
 * This works only for string, hybrid and optimised inverters.
 * @param {Number} trackerVMPPLow
 * @param {Number} panelVMPP
 * @returns Number
 */
function getMinPanelsOnString(trackerVMPPLow, panelVMPP) {
  let minPanels = Math.floor(trackerVMPPLow / panelVMPP) - 2;
  minPanels = minPanels < 1 ? 1 : minPanels;
  return minPanels;
}
/**
 *
 * @param {Number} trackerVOC
 * @param {Number} panelVOC
 * @returns Number
 */
function getMaxPanelsOnString(trackerVOC, panelVOC) {
  const maxPanels = Math.ceil((trackerVOC / panelVOC) / 1.1);
  return maxPanels;
}
function getMaxStringsOnInverter(trackerMaxI, panelIMPP) {
  const maxStrings = Math.ceil(trackerMaxI / panelIMPP);
  return maxStrings;
}

module.exports = { getMinPanelsOnString, getMaxPanelsOnString, getMaxStringsOnInverter };
