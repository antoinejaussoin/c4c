const safeGet = require('safe-get');

module.exports = (data) => {
    const get = path => safeGet(data, 'Return.ReturnData[0].IRS990[0].' + path);

    const result = {};

    result.description = get('Desc[0]');
    result.activity = get('ActivityOrMissionDesc[0]');
    result.mission = get('MissionDesc[0]');
    result.formation = get('FormationYr[0]');
    result.totalRevenue = get('TotalRevenueGrp[0].TotalRevenueColumnAmt[0]');

    return result;
}