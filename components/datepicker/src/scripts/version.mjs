import { writeDepVersionFile } from '../../../../scripts/formVersionWriter.js'
import path from "node:path";

writeDepVersionFile('@aurodesignsystem/auro-popover');
writeDepVersionFile('@aurodesignsystem/auro-dropdown');
writeDepVersionFile(path.resolve(process.cwd(), './components/input'));

