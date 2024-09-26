"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@notionhq/client"); // Import the Notion client
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env
dotenv_1.default.config();
console.log("Script started");
console.log("Notion API Key:", process.env.NOTION_API_KEY);
console.log("Notion Database ID:", process.env.NOTION_TRAVEL_DB_ID);
const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY }); // Define the Notion client
function getAllTravelImages() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Fetching images from Notion...");
        const databaseId = process.env.NOTION_TRAVEL_DB_ID;
        let results = [];
        let hasMore = true;
        let nextCursor = null;
        while (hasMore) {
            const response = yield notion.databases.query({
                database_id: databaseId,
                start_cursor: nextCursor || undefined, // Pagination cursor
            });
            results = results.concat(response.results);
            hasMore = response.has_more;
            nextCursor = response.next_cursor;
        }
        console.log("Received all pages from Notion.");
        return results
            .filter((entry) => { var _a, _b; return (_b = (_a = entry.properties.Image) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b.length; })
            .map((entry) => {
            var _a, _b, _c;
            const file = entry.properties.Image.files[0];
            const slug = ((_c = (_b = (_a = entry.properties.Slug) === null || _a === void 0 ? void 0 : _a.rich_text) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.plain_text) || "untitled"; // Using slug for image name
            const slugFormatted = slug
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[\/\\?%*:|"<>]/g, "-");
            if (file.type === "file") {
                return { url: file.file.url, slug: slugFormatted }; // Internal file URL with slug
            }
            else if (file.type === "external") {
                return { url: file.external.url, slug: slugFormatted }; // External URL with slug
            }
            else {
                console.log(`No valid image found for entry: ${entry.id}`);
                return null;
            }
        })
            .filter(Boolean); // Remove null values
    });
}
function downloadImage(url, destination) {
    return new Promise((resolve, reject) => {
        const file = fs_1.default.createWriteStream(destination);
        https_1.default
            .get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on("finish", () => {
                file.close(() => resolve());
            });
            file.on("error", (err) => {
                fs_1.default.unlink(destination, () => reject(err));
            });
        })
            .on("error", (err) => {
            reject(err);
        });
    });
}
function downloadImages() {
    return __awaiter(this, void 0, void 0, function* () {
        const publicPath = path_1.default.join(process.cwd(), "public", "travel");
        if (!fs_1.default.existsSync(publicPath)) {
            fs_1.default.mkdirSync(publicPath, { recursive: true });
            console.log("Created travel directory.");
        }
        try {
            const images = yield getAllTravelImages();
            if (images) {
                console.log(`Found ${images.length} images. Starting download...`);
            }
            else {
                console.log("No images found to download.");
            }
            // Get the list of files already in the folder
            const existingFiles = fs_1.default
                .readdirSync(publicPath)
                .map((file) => file.toLowerCase());
            if (images) {
                yield Promise.all(images
                    .filter((image) => image !== null)
                    .filter(({ slug }) => !existingFiles.includes(`${slug}.jpg`)) // Skip if the file already exists
                    .map(({ url, slug }) => downloadImage(url, path_1.default.join(publicPath, `${slug}.jpg`))));
            }
            else {
                console.log("No images found to download.");
            }
            console.log("Images downloaded successfully!");
        }
        catch (error) {
            console.error("Error downloading images:", error);
        }
    });
}
downloadImages();
