### Commit Analysis

#### High-level summary
This commit adds new fields to the `/api/users/fetch-tests` endpoint and updates the related database schema and code to reflect these changes.

#### What changed
* Added `duration`, `level`, and `recommended` fields to the `payloadSchema` in `test-entry.js`
* Updated the `TestIndexSchema` in `TestIndex.js` to include `duration`, `level`, and `recommended` fields
* Updated the `TestsSchema` in `TestsSchema.js` to include `duration`, `level`, and `recommended` fields
* Updated the `fetch-test.js` file to include `duration`, `level`, and `recommended` fields in the response
* Updated the `IndexWatcher.js` file to include `duration`, `level`, and `recommended` fields in the test index document

#### Why it likely changed
The changes were likely made to add more information to the `/api/users/fetch-tests` endpoint, such as the duration, level, and recommended status of tests. This could be to provide more context or insights to users.

#### Impact on system
The changes will likely impact the following:
* The `/api/users/fetch-tests` endpoint will return additional information, including duration, level, and recommended status.
* The database schema will be updated to include new fields.
* The code will need to be updated to handle the new fields and schema changes.

#### Possible risks
* The changes may break existing code or integrations that rely on the previous schema or endpoint behavior.
* The new fields may not be properly validated or sanitized, leading to potential security issues.

#### Migration notes (if needed)
* Update the database schema to include the new fields.
* Update the code to handle the new fields and schema changes.
* Test the updated endpoint and code to ensure they work as expected.

#### Test recommendations
* Test the `/api/users/fetch-tests` endpoint with different inputs to ensure it returns the correct information.
* Test the database schema changes to ensure they are correctly applied.
* Test the updated code to ensure it handles the new fields and schema changes correctly.

#### Final release note
Added duration, level, and recommended status to the `/api/users/fetch-tests` endpoint and updated related database schema and code.

### Full markdown explanation

### Commit Analysis

#### High-level summary
This commit adds new fields to the `/api/users/fetch-tests` endpoint and updates the related database schema and code to reflect these changes.

#### What changed
* Added `duration`, `level`, and `recommended` fields to the `payloadSchema` in `test-entry.js`
* Updated the `TestIndexSchema` in `TestIndex.js` to include `duration`, `level`, and `recommended` fields
* Updated the `TestsSchema` in `TestsSchema.js` to include `duration`, `level`, and `recommended` fields
* Updated the `fetch-test.js` file to include `duration`, `level`, and `recommended` fields in the response
* Updated the `IndexWatcher.js` file to include `duration`, `level`, and `recommended` fields in the test index document

#### Why it likely changed
The changes were likely made to add more information to the `/api/users/fetch-tests` endpoint, such as the duration, level, and recommended status of tests. This could be to provide more context or insights to users.

#### Impact on system
The changes will likely impact the following:
* The `/api/users/fetch-tests` endpoint will return additional information, including duration, level, and recommended status.
* The database schema will be updated to include new fields.
* The code will need to be updated to handle the new fields and schema changes.

#### Possible risks
* The changes may break existing code or integrations that rely on the previous schema or endpoint behavior.
* The new fields may not be properly validated or sanitized, leading to potential security issues.

#### Migration notes (if needed)
* Update the database schema to include the new fields.
* Update the code to handle the new fields and schema changes.
* Test the updated endpoint and code to ensure they work as expected.

#### Test recommendations
* Test the `/api/users/fetch-tests` endpoint with different inputs to ensure it returns the correct information.
* Test the database schema changes to ensure they are correctly applied.
* Test the updated code to ensure it handles the new fields and schema changes correctly.

#### Final release note
Added duration, level, and recommended status to the `/api/users/fetch-tests` endpoint and updated related database schema and code.

### Code Changes

```diff
// test-entry.js
const payloadSchema = Joi.object({
  // ...
  totalQuestions: Joi.number().integer().min(1).required(),
  duration: Joi.number().integer().min(1).required(), // ✅ new required field
  level: Joi.string()
    .valid('Beginner', 'Intermediate', 'Advanced')
    .default('Intermediate'),
  recommended: Joi.boolean().default(true)
});

// TestIndex.js
const TestIndexSchema = new mongoose.Schema({
  // ...
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: Array,
  totalQuestions: { type: Number, required: true },
  scoringMethod: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  recommended: { type: Boolean, required: true },
});

// TestsSchema.js
const TestsSchema = new mongoose.Schema({
  // ...
  duration: { type: String }, // ⏱ added, no default
  level: { type: String }, // 🎚 added, no default
  recommended: { type: Boolean }, // ⭐ added, no default
});

// fetch-test.js
router.post('/', async (req, res) => {
  try {
    const data = await mongoose.connection.collection('test_index').find({},
      { projection: {
        _id: 0,
        surveyId: 1,
        description: 1,
        name: 1,
        duration: 1,
        level: 1,
        recommended: 1
      }}
    ).toArray();
    res.status(200).json({ status: true, error: false, data: data });
  } catch (err) {
    console.error(err);
  }
});

// IndexWatcher.js
async function buildSingleTestIndex(surveyIdOrObjectId) {
  try {
    const test = await Test.findOne({ surveyId: surveyIdOrObjectId }) || await Test.findById(surveyIdOrObjectId);
    if (!test.surveyId) {
      console.error(`❌ Test ${test._id} is missing surveyId — aborting index build to avoid mixing.`);
      return;
    }
    const questions = await Question.find({ surveyId: test.surveyId }).lean();
    const testIndexDoc = {
      surveyId: test.surveyId,
      name: test.name,
      description: test.description,
      categories: test.categories,
      totalQuestions: test.totalQuestions,
      scoringMethod: test.scoringMethod,
      duration: test.duration || '8 min',
      level: test.level || 'Intermediate',
      recommended: typeof test.recommended === 'boolean' ? test.recommended : true,
      questions,
      updatedAt: new Date()
    };
    const collection = mongoose.connection.collection('test_index');
    await collection.updateOne({ surveyId: test.surveyId }, { $set: testIndexDoc }, { upsert: true });
    console.log(`✅ Indexed test: ${test.name} (${test.surveyId}) — ${questions.length} questions`);
  } catch (err) {
    console.error(`❌ Error building test index for ${surveyIdOrObjectId}:`, err.message);
  }
}
```