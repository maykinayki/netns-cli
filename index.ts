#!/usr/bin/env ts-node

import { Command } from "commander";
import { applyFn } from "./commands/apply";
import { deleteFn } from "./commands/delete";


const cli = new Command();
cli.version("0.0.1")

cli
    .command("apply")
    .description("apply declaration file")
    .option('-f,--file <file_path>', 'file path')
    .action((options) => {
        applyFn(options.file);
    });

cli
    .command("delete")
    .description("delete declaration file")
    .option('-f,--file <file_path>', 'file path')
    .action((options) => {
        deleteFn(options.file)
    });

cli.parse(process.argv);
