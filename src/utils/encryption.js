/**
 * Payload Obfuscation & Encryption Utility
 * Scrambles outgoing API response data into an unreadable hex ciphertext stream
 * to prevent human inspection in browser DevTools Network tab.
 */

const SECRET_KEY = process.env.DATA_OBFUSCATION_KEY || 'OrqivaTech_Secure_Vault_2026_X89';

export function obfuscatePayload(data) {
  try {
    const jsonStr = JSON.stringify(data);
    const encoded = Buffer.from(jsonStr, 'utf8');
    const keyBytes = Buffer.from(SECRET_KEY, 'utf8');
    const scrambled = Buffer.alloc(encoded.length);
    for (let i = 0; i < encoded.length; i++) {
      scrambled[i] = encoded[i] ^ keyBytes[i % keyBytes.length];
    }
    return scrambled.toString('hex');
  } catch (error) {
    console.error('Payload obfuscation error:', error);
    return null;
  }
}

export function deobfuscatePayload(hexStr) {
  try {
    const scrambled = Buffer.from(hexStr, 'hex');
    const keyBytes = Buffer.from(SECRET_KEY, 'utf8');
    const decoded = Buffer.alloc(scrambled.length);
    for (let i = 0; i < scrambled.length; i++) {
      decoded[i] = scrambled[i] ^ keyBytes[i % keyBytes.length];
    }
    return JSON.parse(decoded.toString('utf8'));
  } catch (error) {
    console.error('Payload deobfuscation error:', error);
    return null;
  }
}
