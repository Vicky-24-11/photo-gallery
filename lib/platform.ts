"use client";

/**
 * Check if the current platform is the one specified
 * @param platform The platform to check ('web', 'ios', 'android', 'capacitor')
 * @returns boolean indicating if the current platform matches
 */
export const isPlatform = (platform: 'web' | 'ios' | 'android' | 'capacitor'): boolean => {
  // Use window check for client-side code
  if (typeof window === 'undefined') {
    return false;
  }

  // Check if Capacitor is available
  const isCapacitor = !!(window as any).Capacitor;

  if (platform === 'capacitor') {
    return isCapacitor;
  }

  if (!isCapacitor) {
    return platform === 'web';
  }

  const capacitorPlatform = (window as any).Capacitor.getPlatform();
  return capacitorPlatform === platform;
};
