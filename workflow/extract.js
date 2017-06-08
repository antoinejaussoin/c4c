import safeGet from 'safe-get';

export default (data) => {
    const get = path => safeGet(data.json, 'Return.ReturnData[0].IRS990[0].' + path);

    const parsed = {};

    parsed.name = data.indexData.OrganizationName;
    parsed.EIN = data.indexData.EIN;
    parsed.DLN = data.indexData.DLN;
    parsed.description = get('Desc[0]');
    parsed.activity = get('ActivityOrMissionDesc[0]');
    parsed.mission = get('MissionDesc[0]');
    parsed.formation = get('FormationYr[0]');
    parsed.totalRevenue = get('TotalRevenueGrp[0].TotalRevenueColumnAmt[0]');

    parsed.nteeCategory = data.nteeParsed.nteeCategory;
    parsed.nteeSubCategory = data.nteeParsed.nteeSubCategory;
    parsed.nteeCategoryName = data.nteeParsed.nteeCategoryName;
    parsed.nteeCharityName = data.nteeParsed.name;
    parsed.nteeCity = data.nteeParsed.city;
    parsed.nteeState = data.nteeParsed.state;
    parsed.nteeRuleDate = data.nteeParsed.ruleDate;
    parsed.nteeIrsSubsection = data.nteeParsed.irsSubsection;
    parsed.nteeTotalRevenue = data.nteeParsed.totalRevenue;
    parsed.nteeTotalAssets = data.nteeParsed.totalAssets;
    parsed.nteeTaxPeriod = data.nteeParsed.taxPeriod;
    
    return { ...data, parsed };
}