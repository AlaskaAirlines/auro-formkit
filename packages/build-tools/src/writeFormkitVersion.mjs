import { writeFile } from 'fs/promises';
import path from "node:path";

function formatDateTime(date) {

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}${month}${day}${hour}${minutes}`;
}

function generateRandomString(length) {
  return formatDateTime(new Date());
}

async function writeVersionFile() {
    const randomString = generateRandomString(10); // Generates a 10-character random string

    const fileContent = `export default '${randomString}';\n`;
    const filePath = path.join(process.cwd(), '../', 'version','version.js');
    await writeFile(filePath, fileContent);

    console.log(`Successfully wrote version file for FormKit: ${randomString}`);
}

export default writeVersionFile().catch(error => {
    console.log(error)
});
