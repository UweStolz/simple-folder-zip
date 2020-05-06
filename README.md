# simple-folder-zip

Simply zip a folder and all of its contents, either programmatic or via CLI.

### Installation

```zsh
yarn global add simple-folder-zip
or
yarn add simple-folder-zip
```

## Usage

### CLI

```
USAGE
  $ page-icon-finder <source> [destination]

ARGUMENTS
  source        The folder you want to have Zipped
  destination  [default: current folder] The path where you want to save the ZIP file to

EXAMPLES
  $ simpleFolderZip <source> [destination]
  $ simpleFolderZip ./example/folder
  $ simpleFolderZip ./example/folder ~/example.zip
```

### Programmatic

```typescript
import simpleFolderZip from 'simple-folder-zip';

const source = '~/myAwesomeFolder';
const destination = './some/folder/example.zip';
  try {
    // If you do not pass a destination path,
    // the Zip will be placed in the current folder with the source folder as name
    const filesize = await simpleFolderZip(source, destination);
    console.log(`Total bytes: ${filesize}`)
  } catch (err) {
    console.error(err);
  }
```

Additionally you can pass [ArchiverOptions](https://www.archiverjs.com/archiver) to the function.


## License

[MIT](LICENSE.md)
