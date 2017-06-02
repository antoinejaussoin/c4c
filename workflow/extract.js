const safeGet = require('safe-get');

module.exports = (data) => {
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
    
    return { ...data, parsed };
}