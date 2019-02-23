const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const fs = require('fs');
const path = require("path")
const Table = require('cli-table3');
const progress = require('cli-progress');





(async () => {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath);
    let folder = "/Users/julianbeck/Desktop/Book 04 - Harry Potter and the Goblet of Fire"
    let files = fs.readdirSync(folder).sort()
    let output = path.join(folder, "finished.mp3")
    let temp = path.join(folder, "temp")
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
        .on("end", () => {console.log(`Finished merging ${files.length} Files`)})
        .on('progress', function (progress) {
            bar.update(progress.percent)

        })

        .mergeToFile(output);
})();