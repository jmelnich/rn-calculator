# Calculator

## Setting up PC
1. Go to (react native docs)[https://facebook.github.io/react-native/docs/getting-started]
2. Make sure to select React Native CLI Quickstart
3. Install  Node, Watchman, the React Native command line interface
4. Based on the system you're developing for, install Android Studio or X-code
5. Cd into this cloned repository and before running `react-native run-android`, set up your phone (step 1)

## Setting up phone
1. Make sure you are a developer (settings > about phone phone version > hit it several times)

### Special for Xiaomi

When develop for Xiaomi, you may face the following issues:

1. If you have error react-native :app:installDebug FAILED:
go to Developer options, scroll down to find 'Turn on MIUI optimization' & disable it. Your Phone will be rebooted

2. If Adb install failure: INSTALL_CANCELED_BY_USER:
Install via USB option should be set to true:
Settings > Additional Settings > Developer Options > Developer options: Check the Install via USB option

3. `com.android.ddmlib.InstallException: Failed to establish session react-native:`
Try start up with deviceId

`react-native run-android --deviceId=yourPhoneId`
`(react-native run-android --deviceId=5facf2740804)`

