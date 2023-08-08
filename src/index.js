#!/usr/bin/env node
const { Command } = require('commander');
const set = require('./commands/set');
const config = require("./commands/config");
const varame = require("./commands/varame");
const program = new Command();
// function varame(input, cmd) {
//     console.log(input);
//     console.log(cmd.variable);
// }

program
    .version('0.0.1')
    .command('config')
    .description('check configuration')
    .action(config.config);
program
    .command('set')
    .description('set configuration')
    .option('-n, --number <number>', 'Number of recommendations',false)
    .option('-F, --Format <format>', 'name format',false)
    .option('-k, --key <key>', 'GPT APT-Key',false)
    .action(set.set);
program
    .option('-v, --variable', 'Variable Mode',false)
    .option('-f, --function', 'Function Mode',false)
    .arguments('<input>')
    .action(varame.varame);
program.parse();
