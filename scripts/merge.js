import * as fs from 'fs';
import * as path from 'path';

const directoryPath = './notes'; // 替换为你的目录路径
const outputFilePath = './dist/前端八股文.md';
let mergedContent = '';

try {
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        console.log(file, filePath);
        const content = fs.readFileSync(filePath, {
            encoding: 'utf8',
        });
        mergedContent += content; // 合并文件内容
    }
    // 将合并后的内容写入新文件（同步方式）
    fs.writeFileSync(outputFilePath, mergedContent, 'utf8');
    console.log('All files have been merged and written to:', outputFilePath);
} catch (err) {
    console.error('An error occurred while reading the files.', err);
    process.exit(1);
}
