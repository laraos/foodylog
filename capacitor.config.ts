import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.foodylog.mobile',
  appName: 'Foodylog',
  webDir: 'dist',
  server: {
    // Enable live reload during development
    // Set CAP_SERVER_URL environment variable for device testing
    // Android Emulator: CAP_SERVER_URL=http://10.0.2.2:5173
    // Physical device: CAP_SERVER_URL=http://YOUR_PC_IP:5173
    url: process.env.CAP_SERVER_URL,
    cleartext: true
  },
  plugins: {
    // Configure plugins for FoodyLog features
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
