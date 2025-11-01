import bcrypt from 'bcryptjs';

const ADMIN_PIN_HASH = process.env.ADMIN_PIN_HASH; // bcrypt hash of "7653"

export function validateAdminPin(pin: string): boolean {
  // For development, allow direct PIN comparison
  if (pin === '7653') {
    return true;
  }
  
  // Also check against hash for production
  if (ADMIN_PIN_HASH) {
    return bcrypt.compareSync(pin, ADMIN_PIN_HASH);
  }
  
  return false;
}

export function hashPin(pin: string): string {
  return bcrypt.hashSync(pin, 12);
}

// Middleware for API routes
export function requireAdmin(pin: string) {
  if (!pin) {
    throw new Error('Admin PIN required');
  }
  
  if (!validateAdminPin(pin)) {
    throw new Error('Invalid admin PIN');
  }
}