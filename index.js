#!/usr/bin/env node

const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const fs = require('fs');
const path = require("path")
const Table = require('cli-table3');
const meow = require('meow');
const formats = [".wav", ".mp3", ".mp4", ".flac", ".ogg", ".mp3", ".mkv", ".mp4", ".avi", ".wmv", ".mov", ".amv", ".mpg", ".flv"]
const chalk = require('chalk');
const ora = require("ora");
const cli = meow(`
    Usage
      $ cliconcat <input> <output file>
 
    Options
      -f, --folder join all audio in folder alphabetically
      -o, --output name of the output file
 
    Examples
      $ cliconcat 1.mp3 2.mp3 3.mp3 -o /path/to/output.mp3
      $ cliconcat -f /audiofolder -o /path/to/output.mp3
`, {
    flags: {
        folder: {
            type: 'boolean',
            alias: '-f'
        },
        output: {
            type: 'string',
            alias: '-o'
        }
    }
});

ffmpeg.setFfmpegPath(ffmpegPath);
let files = [];
if (cli.flags.folder) {
    if (cli.input[0] === undefined) {
        console.log("Please specify a Folder");
        cli.showHelp();
        return;
    }
    files = fs.readdirSync(cli.input[0]).map((file) => {
        return path.join(cli.input[0], file)
    }).sort()
} else {
    if (cli.input.length < 2) {
        console.log(chalk.red("Please specify at least two media File"));
        cli.showHelp();
        return;
    }
    console.log(cli.input)
    cli.input.forEach(file => files.push(file));
}
if (cli.flags.output === undefined) {
    console.log(chalk.red("Please specify an output folder"));
    cli.showHelp()
    return
}
let output = cli.flags.output
console.log(output)
let table = new Table({
    head: ['Order:', 'Files:']
});
files = files.filter(el => formats.includes(path.extname(el)))

//Format for Table
files.map((el, i) => {
    return [i + 1, el]
}).forEach((el) => table.push(el))

console.log(table.toString())
const spinner = ora(`Merging ${files.length} Files`).start();
files.reduce((prev, curr) => prev.input(curr), ffmpeg())
    .on("error", err => {
        spinner.fail(`Finished merging ${files.length} Files`)
        console.log(err)
    })
    .on("end", () => {
        spinner.succeed(`Finished merging ${files.length} Files`)
    }).mergeToFile(output);