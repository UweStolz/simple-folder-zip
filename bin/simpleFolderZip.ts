#!/usr/bin/env node

import { Command } from '@oclif/command';
import ora from 'ora';
import filesize from 'filesize';
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
        spinner.succeed(`ZIP successfully generated
  Size: ${humanReadableSize}`);
      } catch (err) {
        spinner.fail('There was an error while generating the ZIP!');
      }
    }
}

SimpleFolderZip.run()
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
  .catch(require('@oclif/errors/handle'));
