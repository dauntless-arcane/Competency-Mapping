// scripts/fixTestSchema.js
const mongoose = require('mongoose');
const Test = require('../models/TestsSchema'); // adjust path if needed

// 🔧 Replace this with your real MongoDB connection string
const MONGO_URI = 'mongodb+srv://pratyush:eZyVgAbkhBf50KLR@faces-data.mwhisr6.mongodb.net/?retryWrites=true&w=majority&appName=faces-data';

(async () => {
  try {
    console.log('🚀 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected!');

    // Fetch all tests
    const tests = await Test.find({});
    console.log(`📦 Found ${tests.length} test(s)`);

    for (const test of tests) {
      if (!test.categoryConstants || test.categoryConstants.size === 0) {
        // Build constants map from categories
        const constants = {};
        if (Array.isArray(test.categories)) {
          for (const cat of test.categories) {
            const traitName =
              cat.trait || cat.name || cat.label || cat.category || 'General';
            constants[traitName] = 0;
          }
        }

        // Update document
        test.categoryConstants = constants;
        await test.save();
        console.log(`🧩 Updated: ${test.name} (${test.surveyId})`);
      } else {
        console.log(`⚙️ Already has categoryConstants: ${test.name}`);
      }
    }

    console.log('🎉 Migration completed successfully!');
  } catch (err) {
    console.error('❌ Error during migration:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
})();
