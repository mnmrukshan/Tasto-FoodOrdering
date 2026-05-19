import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import foodModel from './models/foodModel.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config();

const seedDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected");

        // 1. Read the frontend assets.js file
        console.log("Reading assets.js from frontend...");
        const assetsPath = path.join(__dirname, '../frontend/src/assets/assets.js');
        const assetsContent = fs.readFileSync(assetsPath, 'utf8');

        // 2. Extract import statements to map variables to actual image file names
        // Example: import food_1 from './food_1.png' => const food_1 = "food_1.png";
        const importRegex = /import\s+(\w+)\s+from\s+['"]\.\/(.*?)['"]/g;
        let match;
        let varDeclarations = '';
        while ((match = importRegex.exec(assetsContent)) !== null) {
            const varName = match[1];
            const fileName = match[2];
            varDeclarations += `const ${varName} = "${fileName}";\n`;
        }

        // 3. Extract the food_list array text directly
        const startIndex = assetsContent.indexOf('export const food_list =');
        if (startIndex === -1) {
            throw new Error("Could not find 'export const food_list =' in assets.js");
        }
        
        // Grab everything from the start of the array to the end of the file
        const foodListText = assetsContent.substring(startIndex + 'export const food_list ='.length).trim();

        // 4. Safely evaluate the array text in a closed function context
        // This translates the JS code from assets.js into a live Node array, injecting the image variables we parsed
        const createFoodList = new Function(`
            ${varDeclarations}
            return ${foodListText};
        `);
        const foodListArray = createFoodList();

        // 5. Clean up the objects (Mongoose will auto-generate new _id ObjectIds)
        const itemsToInsert = foodListArray.map(item => ({
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            category: item.category
        }));

        // 6. Clear existing collection
        console.log("Clearing all existing food items from the database...");
        await foodModel.deleteMany({});
        console.log("✅ Existing items cleared.");

        // 7. Insert the fresh data
        console.log(`Inserting ${itemsToInsert.length} new beautifully updated food items...`);
        await foodModel.insertMany(itemsToInsert);
        console.log("✅ Successfully seeded the database!");

    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        mongoose.disconnect();
        console.log("MongoDB connection closed.");
        process.exit();
    }
};

seedDB();
