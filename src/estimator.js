function getEstimateForImpactCases(noOfReportedCases) {
  const currentlyInfected = noOfReportedCases * 10;
  return currentlyInfected;
}

function getEstimateForSevereCases(noOfReportedCases) {
  const currentlyInfected = noOfReportedCases * 50;
  return currentlyInfected;
}

const convertToDays = (period, periodType) => {
  if (periodType === 'days') {
    return period;
  } if (periodType === 'weeks') {
    return period * 7;
  } if (periodType === 'months') {
    return period * 30;
  } return 0;
};

function getInfectionsForATime(currentlyInfected, period, periodType) {
  const days = convertToDays(period, periodType);
  const infectionsByRequestedTime = currentlyInfected * (2 ** Math.floor(days / 3));
  return infectionsByRequestedTime;
}

function estimatePossibleSevereCases(infectionsByRequestedTime) {
  const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
  return severeCasesByRequestedTime;
}

function estimateAvailableBeds(severeCases, totalHospitalBeds) {
  const availaibleBeds = Math.trunc((35 / 100) * totalHospitalBeds) - severeCases;
  return availaibleBeds;
}

const covid19ImpactEstimator = (data) => {
  const output = {
    data: {},
    impact: {},
    severeImpact: {}
  };

  output.impact.currentlyInfected = getEstimateForImpactCases(
    data.reportedCases
  );

  output.impact.infectionsByRequestedTime = getInfectionsForATime(
    output.impact.currentlyInfected,
    data.timeToElapse,
    data.periodType
  );

  output.impact.severeCasesByRequestedTime = estimatePossibleSevereCases(
    output.impact.infectionsByRequestedTime
  );

  output.impact.hospitalBedsByRequestedTime = estimateAvailableBeds(
    output.impact.severeCasesByRequestedTime,
    data.totalHospitalBeds
  );

  output.severeImpact.currentlyInfected = getEstimateForSevereCases(
    data.reportedCases
  );

  output.severeImpact.infectionsByRequestedTime = getInfectionsForATime(
    output.severeImpact.currentlyInfected,
    data.timeToElapse,
    data.periodType
  );

  output.severeImpact.severeCasesByRequestedTime = estimatePossibleSevereCases(
    output.severeImpact.infectionsByRequestedTime
  );

  output.severeImpact.hospitalBedsByRequestedTime = estimateAvailableBeds(
    output.severeImpact.severeCasesByRequestedTime,
    data.totalHospitalBeds
  );

  output.data = data;
  return output;
};
export default covid19ImpactEstimator;
