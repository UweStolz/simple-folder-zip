#!/usr/bin/env node

import { Command } from '@oclif/command';
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
        default: process.cwd(),
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
      await simpleFolderZip(parsed.args.source, parsed.args.destination);
    }
}

SimpleFolderZip.run()
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
  .catch(require('@oclif/errors/handle'));
