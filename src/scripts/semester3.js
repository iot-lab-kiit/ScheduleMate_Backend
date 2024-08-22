const xlsx = require("xlsx");
const fs = require("fs");

const wb = xlsx.readFile(`./src/data/semester3.xlsx`);
const ws = wb.Sheets["Section-wise Time Table"];
const result = xlsx.utils.sheet_to_json(ws);
const filteredTimetable = result
  .map((day) => {
    const filteredDay = {};
    for (let key in day) {
      if (day[key] !== "---" && day[key] !== "X") {
        filteredDay[key] = day[key];
      }
    }
    return filteredDay;
  })
  .filter((day) => {
    if (Object.keys(day).length > 2 && day["Section"] !== "Section") {
      return true;
    }
    return false;
  });

let groupedTimetable = {};

filteredTimetable.forEach((day) => {
  const section = day.Section;
  const dayOfWeek = day.DAY;

  if (!groupedTimetable[section]) {
    groupedTimetable[section] = {};
  }

  if (!groupedTimetable[section][dayOfWeek]) {
    groupedTimetable[section][dayOfWeek] = [];
  }
  delete day.Section;
  delete day.DAY;
  let x = 0;
  const keys = Object.keys(day);
  const roomKeys = keys.filter((key) => key.startsWith("ROOM"));
  const t = keys.map((key, index) => {
    if (index !== 0) {
      if (keys[index].includes("-") && keys[index - 1].includes("-")) {
        x--;
      }
    }
    if (key.includes("-")) {
      const [startTime, endTime] = key.split("-");
      const room = roomKeys[x];
      groupedTimetable[section][dayOfWeek].push({
        startTime,
        endTime,
        subject: day[key],
        room: day[room],
      });
      x++;
    }
  });
});

fs.writeFile(
  `./src/data/semester3.json`,
  JSON.stringify(groupedTimetable),
  (err) => {
    if (err) {
      throw err;
    }
  }
);
