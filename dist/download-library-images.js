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
const client_1 = require("@notionhq/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env
dotenv_1.default.config();
console.log("Script started");
console.log("Notion API Key 1:", process.env.NOTION_API_KEY);
console.log("Notion Database ID 1:", process.env.NOTION_LIBRARY_DB_ID);
const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
function getLibraryImages() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Fetching images from Notion...");
        const databaseId = process.env.NOTION_LIBRARY_DB_ID;
        const response = yield notion.databases.query({ database_id: databaseId });
        console.log("Received response from Notion.");
        return response.results
            .filter((entry) => { var _a, _b; return (_b = (_a = entry.properties.Image) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b.length; })
            .map((entry) => {
            var _a, _b;
            console.log("Full Entry Properties:", JSON.stringify(entry.properties, null, 2));
            const file = entry.properties.Image.files[0];
            const title = ((_b = (_a = entry.properties.Title) === null || _a === void 0 ? void 0 : _a.title[0]) === null || _b === void 0 ? void 0 : _b.plain_text) || "untitled";
            const titleFormatted = title.toLowerCase().replace(/\s+/g, "-");
            if (file.type === "file") {
                return { url: file.file.url, title: titleFormatted }; // Internal file URL with title
            }
            else if (file.type === "external") {
                return { url: file.external.url, title: titleFormatted }; // External URL with title
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
        https_1.default.get(url, (response) => {
            response.pipe(file);
            file.on("finish", () => resolve());
            file.on("error", reject);
        });
    });
}
function downloadImages() {
    return __awaiter(this, void 0, void 0, function* () {
        const publicPath = path_1.default.join(process.cwd(), "public", "library");
        if (!fs_1.default.existsSync(publicPath)) {
            fs_1.default.mkdirSync(publicPath, { recursive: true });
            console.log("Created library directory.");
        }
        try {
            const images = yield getLibraryImages();
            console.log(`Found ${images.length} images. Starting download...`);
            yield Promise.all(images.filter((image) => image !== null).map(({ url, title }) => downloadImage(url, path_1.default.join(publicPath, `${title}.jpg`))));
            console.log("Images downloaded successfully!");
        }
        catch (error) {
            console.error("Error downloading images:", error);
        }
    });
}
downloadImages();
