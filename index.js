#!/usr/bin/env node

const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const fs = require('fs');
const path = require("path")
const Table = require('cli-table3');
const progress = require('cli-progress');
const meow = require('meow');
const formats = [".wav", ".mp3", ".mp4", ".flac", ".ogg"]

const cli = meow(`
    Usage
      $ cliconcat <input> <output file>
 
    Options
      -f, --folder join all audio in folder alphabetically
      -o, --output name of the output file
 
    Examples
      $ cliconcat 1.mp3 2.mp3 3.mp3 -o /pathto/output.mp3
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

(async () => {
    ffmpeg.setFfmpegPath(ffmpegPath);
    cli.input[0], cli.flags
    let files
    if (cli.flags.folder) {
        if (cli.input[0] === undefined) {
            console.log("Please specify a Folder");
            cli.showHelp();
            return;
        }
        files = fs.readdirSync(cli.input[0]).sort()
    } else {
        if(cli.input.length<2){
            console.log("Please specify at least two media File");
            cli.showHelp();
            return;
        }
        cli.input.forEach(file => files.push(file));
    }
    if (cli.flags.output === undefined) {
        console.log("Please specify an output folder")
        cli.showHelp()
        return
    }
    let output = cli.flags.output
    
    let table = new Table({
        head: ['Order:', 'Files:']
    });
    //Format for Table
    files.map((el, i) => {
        return [i + 1, el]
    }).forEach((el) => table.push(el))

    const bar = new progress.Bar({
        format: 'progress [{bar}] {percentage}% | ETA: {eta}s |'
    });

    bar.start(100, 0);

    files = files.map((file) => {
        return path.join(folder, file)
    })
    files.reduce((prev, curr) => prev.input(curr), ffmpeg())
        .on("error", err => console.log(`An error occurred while merging video files: ${err.message}`))
        .on("end", () => {
            console.log(`Finished merging ${files.length} Files`)
        })
        .on('progress', function (progress) {
            bar.update(progress.percent)

        }).mergeToFile(output);
})();