import { exec, execSync } from "child_process";
import https from "https";
import fs from "fs";
import AdmZip from "adm-zip";

const curlPath = "./curl.sh";
const unzipFolderPath = "./unzipped"; // 替换成你想要解压到的文件夹路径

const createPromise = () => {
	let resolve = () => {
		throw new Error("resolve function not initialized");
	};
	let reject = () => {
		throw new Error("reject function not initialized");
	};
	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return { promise, resolve, reject };
};

export const curl = () => {
	const data = execSync(`sh ${curlPath}`);
	const res = JSON.parse(data.toString());
	console.info("🚀 ~ curl ~ data:", res);
	return res.data;
};

export const downloadFile = (
	fileUrl,
	savePath = "./downloaded_file.zip",
	zipFilePath = "./downloaded_file.zip"
) => {
	const { resolve, promise, reject } = createPromise();
	// 发起HTTP GET请求
	https
		.get(fileUrl, (response) => {
			if (response.statusCode !== 200) {
				console.error(`下载失败，状态码: ${response.statusCode}`);
				return;
			}
			response.on("data", (chunk) => {
				fileStream.write(chunk);
			});

			const fileStream = fs.createWriteStream(savePath);
			response.on("end", () => {
				fileStream.end();
				console.log(`文件已下载到: ${zipFilePath}`);
				resolve(zipFilePath);
			});
		})
		.on("error", (error) => {
			console.error(`下载失败: ${error.message}`);
			reject(error.message);
		});

	return promise;
};

const url = curl();
downloadFile(url).then(
	(path) => {
		console.info("🚀 ~ downloadFile ~ data:", path);
		return path
	},
	(err) => {
		console.error("🚀 ~ downloadFile ~ err:", err);
	}
).then(path => {
	const zip = new AdmZip(path);
	zip.extractAllToAsync('./unzipfolder', true, true);
	return path
}).then((path) => {
	const unzipfolderPath = "./unzipfolder"
	const zip = new AdmZip(path);
	const zipEntries = zip.getEntries(); // an array of ZipEntry records
	let folderName = zipEntries[0].entryName.slice(0, -1);
	console.info("🚀 ~ zipEntries[0].entryName:", folderName)
	execSync(`sh rename.sh ${folderName}`)
});

