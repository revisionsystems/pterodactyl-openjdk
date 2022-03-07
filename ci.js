const utc = new Date();
const fs = require('fs');
const LATEST_JDK_VERSION = 17;

const versions = [16,17];

for (let i = 0; i < versions.length; i++) {
    const version = versions[i];
    const path = `jdk${version}/docker.json`;
    const versionPath = `jdk${version}/.version`;
    if(fs.existsSync(path)){
        const fileBuffer = fs.readFileSync(path);
        const jsonRaw = fileBuffer.toString('utf8');
        const dockerJson = JSON.parse(jsonRaw);
        const versionToWrite = `${dockerJson.baseVersion}.${utc.getFullYear()}.${utc.getMonth() + 1}.${utc.getDate()}.${utc.getHours()}.${utc.getMinutes()}.${utc.getSeconds()}`;
        fs.writeFileSync(versionPath, versionToWrite);
    }else{
        console.warn(`No docker image for jdk:${version} exists`);
    }
}