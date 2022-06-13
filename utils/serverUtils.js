const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const boot = (app) => {
    return new Promise(async(resolve, reject) => {
        let bootDirPath = `${__dirname}/../boot`;
        const files = await fs.readdirAsync(bootDirPath);
        for (const file of files) {
            try {
                console.log(`${bootDirPath}/${file}`);
                await require(`${bootDirPath}/${file}`)(app);
            } catch (e) {
                return reject(e);
            }
        }
        resolve();
    });
}
module.exports = { boot }