#!/usr/bin/env node
const { Command } = require('commander');
const set = require('./commands/set');
const program = new Command();
function test() {
    console.log('test');
}

// function set(cmd) {
//     console.log(cmd.number);
//     console.log(cmd.format);
//     console.log(cmd.key);
// }

function varame(input, cmd) {
    console.log(input);
    console.log(cmd.variable);
}

program
    .version('0.0.1')
    .command('config')
    .description('check configuration')
    .action(test);
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
    .action(varame);
program.parse();
