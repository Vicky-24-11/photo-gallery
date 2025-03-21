import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.mydomain.photogallery',
  appName: 'Photo Gallery',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.1.150:3000',
    cleartext: true,
    androidScheme: 'https',
    allowNavigation: ['*']
  },
  android: {
    allowMixedContent: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    },
    CapacitorHttp: {
      enabled: true,
    },
    StatusBar: {
      overlaysWebView: false,
      style: "LIGHT",
      backgroundColor: "#FFFDFB",
    }
  }
};

export default config;