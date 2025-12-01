// Imports
const express = require('express');
const app = express();
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
var DB = require('./database/mongo.cjs');

// ---------------- PROMETHEUS METRICS --------------------
const promClient = require('prom-client');

// Collect default system metrics
promClient.collectDefaultMetrics({ prefix: 'psych_' });

// Custom http counters
const httpRequestsTotal = new promClient.Counter({
    name: 'psych_http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status']
});

const httpRequestDuration = new promClient.Histogram({
    name: 'psych_http_request_duration_seconds',
    help: 'Request duration in seconds',
    labelNames: ['method', 'route'],
    buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 1, 2, 5]
});

// ------------------ OPEN TELEMETRY TRACING --------------------
let tracer = null;
try {
    const { NodeSDK } = require('@opentelemetry/sdk-node');
    const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
    const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
    const sdk = new NodeSDK({
        traceExporter: new OTLPTraceExporter({
            url: process.env.OTEL_EXPORTER_URL || "http://localhost:4318/v1/traces"
        }),
        instrumentations: [getNodeAutoInstrumentations()]
    });
    sdk.start();
    tracer = require('@opentelemetry/api').trace.getTracer('app-main');
    console.log("✅ OpenTelemetry tracing enabled");
} catch (err) {
    console.log("⚠️ OpenTelemetry not enabled:", err.message);
}

// dot env config
dotenv.config({ path: './.env' });

// express config
// Cors config
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-username, x-email, x-token"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-username, x-email, x-token"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    return res.status(200).end(); // MUST send headers + end response
}


    next();
});
app.use(bodyParser.json());

// --------------- Metrics Middleware (Before all routes) ---------------
app.use((req, res, next) => {
    const end = httpRequestDuration.startTimer({ method: req.method, route: req.path });

    // Start tracing span
    const span = tracer ? tracer.startSpan(`HTTP ${req.method} ${req.path}`) : null;

    res.on('finish', () => {
        httpRequestsTotal.inc({ method: req.method, route: req.path, status: res.statusCode });
        end();

        if (span) {
            span.setAttribute("http.status", res.statusCode);
            span.end();
        }
    });

    next();
});

// ------------------------- CORS -------------------------


// ------------------ Your Routes --------------------------
app.use("/auth", require('./auth/login'));
app.use("/auth/sign-up", require('./auth/registeration'));

app.use("/api/admin", require('./admin/routing'));
app.use("/api/users", require('./users/routing'));

// ------------------ /metrics Endpoint ---------------------
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', promClient.register.contentType);
        res.end(await promClient.register.metrics());
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ------------------ Server -----------------------
const serve = app.listen(3010, () => {
    console.log("🚀 Server running on 3010");
});

// DB.connectDB();
// startSurveyResponseWatcher();