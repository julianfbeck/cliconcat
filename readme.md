
# CliConcat
<p >
  <img width="700" src="https://rawcdn.githack.com/jufabeck2202/cliconcat/c0d161db214b84e279c5dc29acecaf7f64337150/cliconcat.svg">
</p>

> Concat Audio and Media files directly in the Cli

**CliConcat** can easily join multiple Audio or Media files into one files. You can either specify files or a folder with media files to join.

Install **CliConcat** globally

```shell
npm install -g cliconcat
```
## Usage
```shell
   Easily join media files in the CLI

  Usage
    $ cliconcat <input> <output file>
 
  Options
    -f, --folder join all audio in folder alphabetically
    -o, --output name of the output file
 
  Examples
    $ cliconcat 1.mp3 2.mp3 3.mp3 -o /path/to/output.mp3
    $ cliconcat -f /audiofolder -o /path/to/output.mp3 
```
## Usage: 
### Specify each file:
```shell
    $ cliconcat 1.mp3 2.mp3 3.mp3 -o /path/to/output.mp3
```
### Concat a folder of audio Files:
```shell
    $ cliconcat -f /audiofolder -o /path/to/output.mp3 
```
### Options:
**-f, --folder:** folder with audio files, cliconcat will concat all files alphabetically

**-o, --output :** Path and name of the Joined media file

## License

MIT © [Julian Beck](https://github.com/jufabeck2202)