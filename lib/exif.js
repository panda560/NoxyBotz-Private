/* Originally created by cwke
 * Reuploaded by Waxaranai
 * Recoded by Artabotz
 *
 * GitHub is an open-source community, so why are you so triggered when someone shared some simple code?
 */

const fs = require("fs");
const packID =
	"com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2";
const playstore = "";
const itunes = "";

/**
 * @class Exif
 */
module.exports = class Exif {
	constructor() {}

	/**
	 * Create an EXIF file.
	 * @param {String} packname
	 * @param {String} authorname
	 * @param {String} filename
	 */
	/*create(packname, authorname, filename) {
		if (!filename) filename = "data";
		const json = {
			"sticker-pack-id": packID,
			"sticker-pack-name": packname,
			"sticker-pack-publisher": authorname,
			"android-app-store-link": playstore,
			"ios-app-store-link": itunes,
			emojis: ["😁"],
		};
		let len = new TextEncoder().encode(JSON.stringify(json)).length;
		const f = Buffer.from([
			0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07,
			0x00,
		]);
		const code = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00];
		if (len > 256) {
			len = len - 256;
			code.unshift(0x01);
		} else {
			code.unshift(0x00);
		}
		const fff = Buffer.from(code);
		const ffff = Buffer.from(JSON.stringify(json));
		if (len < 16) {
			len = len.toString(16);
			len = "0" + len;
		} else {
			len = len.toString(16);
		}
		const ff = Buffer.from(len, "hex");
		const buffer = Buffer.concat([f, ff, fff, ffff]);
		fs.writeFile(`./temp/${filename}.exif`, buffer, (err) => {
			if (err) return console.error(err);
			console.log("Success!");
		});
	}
	*/
	create(packname, authorname, filename) {
		if (!filename) filename = "data";
		const json = {
			"sticker-pack-id": packID,
			"sticker-pack-name": packname,
			"sticker-pack-publisher": authorname,
			"android-app-store-link": playstore,
			"ios-app-store-link": itunes,
			emojis: ["😁"],
		};
		const data = JSON.stringify(json)
        const exif = Buffer.concat([
            Buffer.from([
                0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00,
                0x00, 0x16, 0x00, 0x00, 0x00
            ]),
            Buffer.from(data, 'utf-8')
        ])
        exif.writeUIntLE(new TextEncoder().encode(data).length, 14, 4)
		fs.writeFile(`./temp/${filename}.exif`, exif, (err) => {
			if (err) return console.error(err);
			console.log("Success!");
		});
	}
};
