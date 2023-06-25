# 🧩 LZW Compressor
> Backend side of TextFile compression using LZW Algorithm with MERN techstack

## General Information
LZW Compressor, as its name, is a simple webapp txt-file compression using popular compression algorithm, LZW algorithm. This app receive the string input to be compress into binary bytes and you can decompress it also to get the original string. This app also give the compression and decompression history using mongoDB database and available online on a website. Furthermore, the project information is also provided for future improvements.

## Prerequisites
- node.js (v 18.12.1)
- npm (v 8.19.2)
- dotenv (v 16.3.1)
- express (v 4.18.2)
- mongodb (v 5.6.0)
- mongoose (v 7.3.1)
- nodemon (v 2.0.22)

## Process Flow
### Input
Input of compressing process is a string, constructed by ASCII character and input of the decompressing process is a binary bytes of a compressed string.
### Algorithms
Algorithm applied for this process is LZW algorithm. The algorithm is able to compress and decompress the input.
### Output
Input of compressing process is a binary bytes of a compressed string and input of the decompressing process is a decompressed string.

## Available Scripts
In the project directory, you can run:

### `npm run start-dev`

Ths runs the app in the development mode.

The page will reload if you make edits.<br />
You will also see any lint errors in the console. You can also use the environment by appyling the basic .env configuration on .env.example file.

## Contributors
<a href = "https://github.com/mikeleo03/markdown-editor/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=mikeleo03/markdown-editor"/>
</a>