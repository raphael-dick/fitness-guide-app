const express = require("express")
const formData = require("express-form-data")
const cors = require("cors")
const dotenv = require("dotenv")
const jimp = require("jimp")

// custom modules
const ufn = require("./custom_modules/unique-filename")

// dotenv setup
dotenv.config()

// .env Variables
const port = process.env.PORT

// express setup
const app = express()

// express-form-data setup
app.use(formData.parse({
	uploadDir: "public/temp/",
	autoClean: true
}))
app.use(formData.format())

// cors setup
app.use(cors())


const supported_types = ["image/jpeg", "image/png", "image/bmp", "image/tiff", "image/gif"]

app.post("/profileimages/", (req, res) => {
	if (supported_types.includes(req.files.file.type)) {
		if (!req.files.file) {
			res.status(400).json({
				success: false,
				error: "no file provided"
			})
			return
		}

		let random = ufn("public/profileimages/", "png")

		jimp.read(req.files.file.path)
			.then(img => {
				return img.resize(256, 256).write("public/profileimages/large/" + random + ".png");
			})
			.then(img => {
				return img.resize(32, 32).write("public/profileimages/small/" + random + ".png");
			})
			.then(() => {
				res.status(201).json({
					success: true,
					path: "localhost:" + port + "/profileimages/" + random + "/"
				})
			})
			.catch(err => res.status(500).json({
				success: false,
				error: err
			}))
	} else {
		res.status(400).json({
			success: false,
			error: "file must be an image",
			supported_types
		})
	}
})

app.get("/profileimages/:id", (req, res) => {
	res.sendFile(__dirname + "/public/profileimages/large/" + req.params.id + ".png")
})

app.get("/profileimages/:id/small", (req, res) => {
	res.sendFile(__dirname + "/public/profileimages/small/" + req.params.id + ".png")
})

app.get("/video/:id", (req, res) => {
	res.sendFile(__dirname + "/public/videos/" + req.params.id + ".mp4")
})

app.get("/thumbnail/:id", (req, res) => {
	res.sendFile(__dirname + "/public/thumbnails/" + req.params.id + ".jpg")
})

// static route to "/profileimages"
//app.use("/profileimages", express.static("public/profileimages"))

// start server
app.listen(port, () => {
	console.log("\x1b[36m"); // console color cyan
	console.log("Started fileserver on http://localhost:" + port)
	console.log("\x1b[0m"); // reset color
})