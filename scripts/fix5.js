/**
 * Restore options from backup DB into main DB using questionId.
 * 
 * Requirements:
 *  - Put this file in your backend/scripts folder (or anywhere)
 *  - Run: node restoreOptions.js
 */

const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const path = require("path");
const dotenv = require("dotenv");

// Load your main .env (for MAIN DB)
dotenv.config({ path: path.join(__dirname, "../.env") });

// Import your existing Mongoose connection (MAIN DB)
const mainConnection = require("../database/mongo.cjs"); // adjust if your path is different

// ==== CONFIGURE BACKUP DB ====
const BACKUP_URI = "mongodb+srv://pratyush:eZyVgAbkhBf50KLR@faces-data.mwhisr6.mongodb.net/?retryWrites=true&w=majority&appName=faces-data";
const BACKUP_DB_NAME = "test";            // CHANGE IF NAME DIFFERENT
const BACKUP_COLLECTION = "questions";          // CHANGE IF NAME DIFFERENT

// ==== CONFIGURE MAIN DB ====
const MAIN_DB_NAME = mainConnection.connection.name;
const MAIN_COLLECTION = "questions";            // CHANGE IF DIFFERENT


async function restoreOptions() {

    console.log("\n==============================");
    console.log(" STARTING OPTIONS RESTORE TOOL");
    console.log("==============================\n");

    // --- Connect Backup Client ---
    const backupClient = new MongoClient(BACKUP_URI);

    try {
        console.log("📡 Connecting to BACKUP DB...");
        await backupClient.connect();

        console.log("📦 Loading backup collection...");
        const backupCol = backupClient.db(BACKUP_DB_NAME).collection(BACKUP_COLLECTION);

        console.log("🔍 Loading MAIN DB collection...");
        const mainCol = mongoose.connection.db.collection(MAIN_COLLECTION);

        const cursor = backupCol.find(
            {},
            { projection: { questionId: 1, options: 1, _id: 0 } }
        );

        let processed = 0;
        let restored = 0;
        let notFound = 0;

        console.log("\n🔧 Restoring options...");

        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            processed++;

            const { questionId, options } = doc;

            if (!questionId || !options) continue;

            const res = await mainCol.updateOne(
                { questionId },
                { $set: { options } }
            );

            if (res.matchedCount === 0) {
                notFound++;
                console.log(`⚠️ Not found in MAIN DB → questionId = ${questionId}`);
            } else {
                restored++;
                console.log(`✔ Restored labels → ${questionId}`);
            }
        }

        console.log("\n===== RESTORE COMPLETE =====");
        console.log("Total processed:", processed);
        console.log("Successfully restored:", restored);
        console.log("Not found in MAIN DB:", notFound);
        console.log("============================\n");

    } catch (err) {
        console.error("❌ Restore failed:", err);
    } finally {
        await backupClient.close();
        console.log("🔌 Backup DB closed\n");
        process.exit(0);
    }
}

restoreOptions();
