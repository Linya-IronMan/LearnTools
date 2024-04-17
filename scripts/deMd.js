// const fs = require('fs');
// const path = require('path');
import * as fs from 'fs';
import * as path from 'path';

const directoryPath = './notes'; // 替换为你的目录路径

const files = await fs.readdirSync(directoryPath);
console.info(files);

files.forEach(fileName => {
    main(`${directoryPath}/${fileName}`);
});

async function main(filepath) {
    const inputFilePath = filepath; // 输入的Markdown文件路径
    const outputFilePath = filepath; // 输出的Markdown文件路径

    // 正则表达式匹配代码块（由三个反引号包围）
    const codeBlockRegex = /```[\s\S]*?```/gm;

    // 正则表达式匹配图片链接（<img src="image url">）
    const imageLinkRegex = /!\[.*?\]\(.*?\)/gm;

    // 读取Markdown文件内容
    const markdownContent = fs.readFileSync(inputFilePath, 'utf8');

    // 剔除代码块和图片链接
    const cleanedContent = markdownContent
        .replace(codeBlockRegex, '')
        .replace(imageLinkRegex, '');

    // 将处理后的内容写入新的Markdown文件或输出到控制台
    fs.writeFileSync(outputFilePath, cleanedContent);
    // console.log(cleanedContent); // 如果你只想在控制台查看结果，可以取消注释这行并注释掉上面的fs.writeFileSync调用

    console.log(`Processed content has been saved to ${outputFilePath}`);
}
