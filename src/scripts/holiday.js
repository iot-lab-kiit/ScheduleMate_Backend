const { parse } = require('node-html-parser');
const HtmlTableToJson = require('html-table-to-json');
const fs = require('fs');

const main = async () => {
  const holidayData = fs.readFileSync('./src/data/holiday.txt', {
    encoding: 'utf8',
  });

  const html = parse(holidayData);
  const tables = html
    .querySelector(
      '.fusion-column-wrapper.fusion-column-has-shadow.fusion-flex-justify-content-flex-start.fusion-content-layout-column',
    )
    .querySelectorAll('.table-1');
  const table1 = tables[0].innerHTML;
  const table2 = tables[1].innerHTML;
  const jsonTables1 = HtmlTableToJson.parse(table1);
  const jsonTables2 = HtmlTableToJson.parse(table2);
  const data = [...jsonTables1.results[0], ...jsonTables2.results[0]];
  fs.writeFileSync('./src/data/holidays.json', JSON.stringify(data));
};

main();
