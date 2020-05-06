/* eslint-disable consistent-return */
import { access, createWriteStream, constants } from 'fs-extra';
import archiver, { ArchiverOptions } from 'archiver';
import { dirname, sep } from 'path';

let archiveSize: number;

function zipFolder(
  src: string,
  dest: string,
  callback: { (err?: NodeJS.ErrnoException): void },
  options?: ArchiverOptions,
): any {
  access(src, constants.F_OK, (error: NodeJS.ErrnoException) => {
    if (error) {
      return callback(error);
    }

    const destFolderName = dirname(dest);
    access(destFolderName, constants.F_OK, (err: NodeJS.ErrnoException) => {
      if (err) {
        return callback(err);
      }
      const output = createWriteStream(dest);
      const zipArchive = archiver('zip', options);

      output.on('close', () => {
        archiveSize = zipArchive.pointer();
        callback();
      });

      zipArchive.pipe(output);
      zipArchive.directory(src, false);
      zipArchive.finalize();
    });
  });
}

export default async function simpleFolderZip(
  sourceFolder: string,
  destinationPath?: string,
  options?: ArchiverOptions,
): Promise<number> {
  const destination = destinationPath || `${sourceFolder.split(sep).pop()}.zip`;

  return new Promise((resolve, reject) => {
    zipFolder(sourceFolder, destination, (err: any) => {
      if (err) {
        reject(err);
      }
      resolve(archiveSize);
    }, options);
  });
}
