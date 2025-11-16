const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  tokenId: { type: String, required: true, unique: true }, // jti
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  revoked: { type: Boolean, default: false },
  replacedByTokenId: { type: String, default: null },
  ip: { type: String },
  userAgent: { type: String }
});

RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // optional TTL

module.exports = mongoose.models.RefreshToken || mongoose.model('RefreshToken', RefreshTokenSchema);
