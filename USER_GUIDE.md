# USER GUIDE -- How to Run and Use the Project

## Prerequisites

Make sure you have: 1. Node.js (v18 or above) 2. npm 3. Expo CLI 4. Expo
Go App (installed on your phone)

Check versions: node -v npm -v

------------------------------------------------------------------------

## Step 1: Clone the Repository

    git clone <YOUR_GITHUB_REPO_LINK>

------------------------------------------------------------------------

## Step 2: Open Project Folder

    cd <project-folder-name>

------------------------------------------------------------------------

## Step 3: Install Dependencies

    npm install

------------------------------------------------------------------------

## Step 4: Start Expo Server

    npx expo start

A QR code will appear in the terminal or browser.

------------------------------------------------------------------------

## Step 5: Run the App

Option A -- Physical Device (Recommended): 1. Open Expo Go App 2. Scan
QR Code 3. App will launch

Option B -- Emulator: Press: a (for Android) i (for iOS)

------------------------------------------------------------------------

# How to Use the App

1.  Enter Email
2.  Tap "Send OTP"
3.  OTP will appear in terminal (for testing purpose)
4.  Enter OTP within 60 seconds
5.  Maximum 3 attempts allowed
6.  On success → Session screen opens
7.  Logout → session stops

------------------------------------------------------------------------

# Troubleshooting

If app doesn't start: - Make sure node modules installed - Run: npm
install - Restart expo: npx expo start --clear

If QR not working: - Make sure phone and laptop are on same network.

------------------------------------------------------------------------

Now anyone cloning this repository can run the project without
difficulty.
