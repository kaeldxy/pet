const path = require("path");
const os = require("os")
// os.type()
// 在 Linux 上返回 'Linux'，在 macOS 上返回 'Darwin'，在 Windows 上返回 'Windows_NT'。
module.exports = {
    rootPath: path.join(/window/i.test(os.type()) ? "" : "/", path.resolve(__dirname, "../"))//项目根路径
}