const XLSX = require('xlsx');
const fs = require('fs');
const readline = require('readline');
const workbook = XLSX.readFile('translation.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(worksheet);

const result = {};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Select an option: Type 1 for VN, Type 2 for EN\n', (choice) => {
  data.forEach(row => {
    const category = row.Category;
    const subCategory = row['Sub-Category'];
    const label = row.label;
    const en = SelectLanguage(choice, row)

    if (!result[category]) {
      result[category] = {};
    }

    if (subCategory) {
      if (!result[category][subCategory]) {
        result[category][subCategory] = {};
      }
      result[category][subCategory][label] = en;
    } else {
      result[category][label] = en;
    }
  });

  fs.writeFile('test.json', JSON.stringify(result, null, 2), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File has been created');
  });

  rl.close();
});

function SelectLanguage(choice, row){

  if (choice === '1') {

    return row.vn
  } else if (choice === '2') {

    return row.en
  } else {
    console.log('Invalid choice');
  }
}