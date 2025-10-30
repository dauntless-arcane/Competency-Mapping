# 🧩 API: Fetch Available Tests

### Endpoint

### Description
Returns a list of all personality or competency tests available in the system.  
Each test is represented by its unique `surveyId` and a `description`.

### Authentication
> None required (for now).

### Request Headers
| Header | Value | Required |
|--------|--------|-----------|
| `Authorization` | `Bearer <token>` | ❌ (not required yet) |

### Request Body
None.

---

### Response — `200 OK`
```json
{
  "status": true,
  "error": false,
  "data": [
    {
      "surveyId": "FA138D2",
      "description": "A sample personality test for demo"
    },
    {
      "surveyId": "6685B19",
      "description": "A sample personality test for demo"
    },
    {
      "surveyId": "8C4D505",
      "description": "A sample personality test for demo"
    },
    {
      "surveyId": "0938735",
      "description": "A sample personality test for demo"
    },
    {
      "surveyId": "17C7CB6",
      "description": "Measures five major personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism."
    }
  ]
}
