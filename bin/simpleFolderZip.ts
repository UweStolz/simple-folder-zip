#!/usr/bin/env node

import { Command, flags } from '@oclif/command';
import ora from 'ora';
import filesize from 'filesize';
import nodeNotifier from 'node-notifier';
import simpleFolderZip from '../lib';

export default class SimpleFolderZip extends Command {
    static args = [
      {
        name: 'source',
        description: 'The folder you want to have Zipped',
        required: true,
      },
      {
        name: 'destination',
        description: 'The path where you want to save the ZIP file to',
        required: false,
      },
    ]

    static flags = {
      notify: flags.boolean({
        description: 'Send a notification if the Zip process is finished',
        char: 'n',
        required: false,
      }),
    }

    static description = 'ZIP a folder and its contents recursively'

    static examples = [
      '$ simpleFolderZip <source> [destination]',
      '$ simpleFolderZip ./example/folder',
      '$ simpleFolderZip ./example/folder ~/example.zip',
    ]

    async run(): Promise<void> {
      const parsed = this.parse(SimpleFolderZip);
      const spinner = ora('Generating ZIP...');
      try {
        spinner.start();
        const size = await simpleFolderZip(parsed.args.source, parsed.args.destination);
        const humanReadableSize = filesize(size);
        const successMessage = `ZIP successfully generated
 Size: ${humanReadableSize}`;
        spinner.succeed(successMessage);
        if (parsed.flags.notify) {
          nodeNotifier.notify({
            title: 'Simple-Folder-Zip',
            message: `${successMessage}`,
          });
        }
      } catch (err) {
        const failMessage = 'There was an error while generating the ZIP!';
        spinner.fail(failMessage);
        if (parsed.flags.notify) {
          nodeNotifier.notify({
            title: 'Simple-Folder-Zip',
            message: failMessage,
          });
        }
      }
    }
}

SimpleFolderZip.run()
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
  .catch(require('@oclif/errors/handle'));
