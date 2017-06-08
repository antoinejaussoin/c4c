import cheerio from 'cheerio';

export default (data) => new Promise((resolve) => {
  const $ = cheerio.load(data.nteeBody);
  const table = $('#dataTable');
  const cells = table.find('tr td.trow');
  
  const parsed = {
    taxPeriod: $(cells[0]).text(),
    name: $(cells[1]).text(),
    city: $(cells[2]).text(),
    state: $(cells[3]).text(),
    ntee: $(cells[4]).text(),
    ruleDate: $(cells[5]).text(),
    irsSubsection: $(cells[6]).text(),
    totalRevenue: $(cells[7]).text(),
    totalAssets: $(cells[8]).text()
  };

  const improved = improve(parsed);

  data.nteeParsed = improved;

  resolve(data);
});

const nteeRegex = /([A-Z])(\d*)\s-\s(.*)/;
const improve = parsed => {
  const ntee = parsed.ntee.trim();
  const regexResults = ntee.length ? nteeRegex.exec(ntee) : [];
  if (regexResults == null) {
    console.error('Regex error: ', '"' + ntee + '"', JSON.stringify(ntee));
  }
  return {
    ...parsed,
    ntee,
    taxPeriod: Number(parsed.taxPeriod),
    ruleDate: Number(parsed.ruleDate),
    totalRevenue: Number(parsed.totalRevenue.replace(/,/g, '')),
    totalAssets: Number(parsed.totalAssets.replace(/,/g, '')),
    nteeCategory: regexResults.length > 3 ? regexResults[1] : '',
    nteeSubCategory: regexResults.length > 3 ? regexResults[2] : '',
    nteeCategoryName: regexResults.length > 3 ? regexResults[3] : '',
    irsSubsection: parsed.irsSubsection.trim()
  };
};