// fetch-images.js

const fs = require("fs");
const https = require("https");
const path = require("path");

// Function to download an image from a URL
const downloadImage = (url, destination) => {
	const file = fs.createWriteStream(destination);
	https.get(url, (response) => {
		response.pipe(file);
		file.on("finish", () => {
			file.close();
			console.log(`Downloaded: ${destination}`);
		});
	});
};

// Example: Fetch image URLs from your Notion data (this can be dynamic)
const imageUrls = [
	"https://example.com/image1.jpg",
	"https://example.com/image2.jpg",
];

// Local folder to store the images
const imageFolder = path.join(__dirname, "public", "assets", "images");

// Create folder if it doesn't exist
if (!fs.existsSync(imageFolder)) {
	fs.mkdirSync(imageFolder, { recursive: true });
}

// Download each image to the local folder
imageUrls.forEach((url) => {
	const fileName = path.basename(url);
	const destination = path.join(imageFolder, fileName);
	downloadImage(url, destination);
});
