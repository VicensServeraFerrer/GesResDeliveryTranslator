import crypto from "crypto";


export function create_token() {
  return crypto.randomBytes(32).toString("hex");
}

export function sha256(value) {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");
}