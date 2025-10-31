// // scripts/fix-testindex-metadata.js
// const mongoose = require('mongoose');
// const TestIndex = require('../models/TestsSchema');

// (async () => {
//   try {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('✅ Connected to MongoDB');
// console.log('📂 Connected to DB:', mongoose.connection.name);
// console.log('📦 Collections:', await mongoose.connection.db.listCollections().toArray());

//     // Forcefully set (overwrite or add) these fields for all documents
//     const result = await TestIndex.updateMany({}, {
//       $set: {
//         duration: "8 min",
//         level: "Intermediate",
//         recommended: true
//       }
//     });

// console.log('Matched:', result.matchedCount, 'Modified:', result.modifiedCount);
//     await mongoose.disconnect();
//     console.log('🔒 Disconnected from MongoDB');
//   } catch (err) {
//     console.error('❌ Error fixing TestIndex documents:', err);
//     process.exit(1);
//   }
// })();
const mongoose = require('mongoose');

// 🧠 Adjust to your actual connection string
const MONGO_URI = 'mongodb://localhost:27017/your_database_name';

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // 🧩 Get the raw collection your documents are actually in
    const collection = mongoose.connection.db.collection('tests'); // <-- change this if needed

    // 🔍 Check how many docs exist before
    const countBefore = await collection.countDocuments();
    console.log(`📊 Documents found: ${countBefore}`);

    // 🛠 Update every document to add the new fields
    const result = await collection.updateMany({}, {
      $set: {
        duration: "8 min",
        level: "Intermediate",
        recommended: true
      }
    });

    console.log(`🧾 Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
    console.log('🎯 Fields added successfully to all documents');

    await mongoose.disconnect();
    console.log('🔒 Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Error fixing data:', err);
    process.exit(1);
  }
})();
