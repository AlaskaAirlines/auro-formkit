import glob from "glob";
import fs from "fs";

const importline = `import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
useAccessibleIt();`;

function findTestFiles() {
  return new Promise((resolve, reject) => {
    glob("./components/**/test/*.test.js", (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

async function main() {
  const testFiles = await findTestFiles();

  testFiles.forEach(path => {
    const data = fs.readFileSync(path, 'utf8');
    const updated = importline + "\n" + data.replace(/  expect\(/g, '  await expect(');
    fs.writeFileSync(path, updated);
  });
};

main();
