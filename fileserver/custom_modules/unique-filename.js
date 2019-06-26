const crypto = require("crypto")
const fs = require("fs")

module.exports = (path, fileextension) => {
	let name
	do
		name = crypto.createHash('md5').update(Math.random().toString(36).replace(/[^a-z]+/g, '')).digest("hex")
	while (fs.existsSync(path + name + "." + fileextension));
	return name
}