const covid19ImpactEstimator = ($input) => {
  let output = {
    data: {},
    impact: {},
    severeImpact: {}
  };

  output.impact.currentlyInfected = normal.getEstimateForImpactCases(
    $input.reportedCases
  );

  output.impact.infectionsByRequestedTime = normal.getInfectionsForATime(
    output.impact.currentlyInfected,
    $input.timeToElapse,
    $input.periodType
  );

  output.impact.severeCasesByRequestedTime = normal.estimatePossibleSevereCases(
    output.impact.infectionsByRequestedTime
  );

  output.impact.hospitalBedsByRequestedTime = normal.estimateAvailableBeds(
    output.impact.severeCasesByRequestedTime,
    $input.totalHospitalBeds
  );

  output.severeImpact.currentlyInfected = severe.getEstimateForSevereCases(
    $input.reportedCases
  );

  output.severeImpact.infectionsByRequestedTime = severe.getInfectionsForATime(
    output.severeImpact.currentlyInfected,
    $input.timeToElapse,
    $input.periodType
  );

  output.severeImpact.severeCasesByRequestedTime = severe.estimatePossibleSevereCases(
    output.severeImpact.infectionsByRequestedTime
  );

  output.severeImpact.hospitalBedsByRequestedTime = severe.estimateAvailableBeds(
    output.severeImpact.severeCasesByRequestedTime,
    $input.totalHospitalBeds
  );
  output.data = $input;
  return output;
};

class normalImpactComputors {
  getEstimateForImpactCases = (noOfReportedCases) => {
    let currentlyInfected = noOfReportedCases * 10;
    return currentlyInfected;
  };

  getInfectionsForATime = (currentlyInfected, period, periodType) => {
    let days = convertToDays(period, periodType);
    let infectionsByRequestedTime =
      currentlyInfected * Math.pow(2, Math.floor(days / 3));
    return infectionsByRequestedTime;
  };

  estimatePossibleSevereCases = (infectionsByRequestedTime) => {
    const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
    return severeCasesByRequestedTime;
  };

  estimateAvailableBeds = (severeCases, totalHospitalBeds) => {
    const availaibleBeds =
      Math.round((35 / 100) * totalHospitalBeds) - severeCases;
    return availaibleBeds;
  };
}

class severeImpactComputors {
  getEstimateForSevereCases = (noOfReportedCases) => {
    let currentlyInfected = noOfReportedCases * 50;
    return currentlyInfected;
  };

  getInfectionsForATime = (currentlyInfected, period, periodType) => {
    let days = convertToDays(period, periodType);
    let infectionsByRequestedTime =
      currentlyInfected * Math.pow(2, Math.floor(days / 3));
    return infectionsByRequestedTime;
  };

  estimatePossibleSevereCases = (infectionsByRequestedTime) => {
    const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
    return severeCasesByRequestedTime;
  };

  estimateAvailableBeds = (severeCases, totalHospitalBeds) => {
    const availaibleBeds =
      Math.round((35 / 100) * totalHospitalBeds) - severeCases;
    return availaibleBeds;
  };
}

const normal = new normalImpactComputors();
const severe = new severeImpactComputors();
const convertToDays = (period, periodType) => {
  if (periodType == 'days') {
    return period;
  } else if (periodType == 'weeks') {
    period = period * 7;
  } else {
    period = period * 30;
  }
  return period;
};
covid19ImpactEstimator($input);
export default covid19ImpactEstimator;
