import fs from 'fs';

const checkFileAccess = async function (path: string): Promise<boolean> {
  try {
    const found = await fs.promises.access(path, fs.constants.F_OK);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const buildDirectories = function (dirPath: string): void {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
};

export { checkFileAccess, buildDirectories };
