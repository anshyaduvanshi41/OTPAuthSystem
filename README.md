# OTP Authentication App -- React Native (Expo + TypeScript)

## Project Overview

This project implements a Passwordless Authentication Flow using Email +
OTP. After successful verification, the user is navigated to a Session
Screen that tracks active session time.

The project includes:

- OTP generation with expiry handling
- Maximum attempt restriction
- Countdown timer UI
- Session tracking using custom hook
- Persistent login using AsyncStorage
- Clean interval management with proper cleanup

------------------------------------------------------------------------

# 1. OTP Logic & Expiry Handling

## OTP Generation

- A 6-digit random OTP is generated.
- OTP expiry is set to 60 seconds from generation.
- Maximum 3 incorrect attempts are allowed.
- OTP is stored in AsyncStorage using the email as key reference.

Expiry logic: expiry = Date.now() + 60000

## Validation Flow

1.  Check if OTP exists for the email.
2.  Check if OTP is expired.
3.  Check if maximum attempts (3) exceeded.
4.  Compare entered OTP with stored OTP.

Possible outcomes: 
- Incorrect OTP → attempt count increases. 
- Expired OTP → error message. 
- Attempts exceeded → verification blocked. 
- Correct OTP → navigate to session screen.

On successful verification:
- OTP entry is removed from storage.
- Session is marked as logged in using AsyncStorage.

------------------------------------------------------------------------

# 2. Data Structures Used & Why

## Email-keyed Object

{ email: { otp: string, expiry: number, attempts: number } }

Why? - O(1) lookup using email as key - Supports multiple users - Easy
update & deletion - Clean and scalable

## React Hooks Used :-

## useState

Used for:
- OTP input
- Error handling
- Countdown timer
- Session duration updates

## useRef

Used inside custom session hook to:
- Store session start time
- Prevent reset on re-render

## useEffect

Used for:
- OTP countdown timer
- Session timer interval
- AsyncStorage login check
- Proper cleanup to prevent memory leaks

## setInterval with Cleanup

Both OTP timer and session timer use:
- setInterval for live updates
- clearInterval inside cleanup function
This prevents memory leaks and unwanted background execution.

------------------------------------------------------------------------

# 3. External SDK Used & Why

AsyncStorage

Used for:
- Storing OTP data
- Tracking session login state
- Persisting session across app restarts
- Storing analytics logs

Why AsyncStorage?
- Lightweight and simple
- No backend required
- Works after app reload
- Suitable for local state persistence

------------------------------------------------------------------------

# 4. Session Persistence

After successful login:
AsyncStorage.setItem('isLoggedIn', 'true')

On app start:
- AsyncStorage is checked
- Initial route is dynamically set to: 
- "Session" if logged in 
- "Login" otherwise

On logout:
AsyncStorage.removeItem('isLoggedIn')
This ensures persistent login behavior.

------------------------------------------------------------------------

# 5. GPT Usage Disclosure

I referred to GPT occasionally for small doubts and documentation
formatting. The OTP generation logic, Expiry handling, Attempt limiting, 
Session timer hook, Navigation flow, AsyncStorage persistence logic, 
Memory leak prevention, Error handling, and overall implementation were 
written and understood by me.

------------------------------------------------------------------------

Tech Stack: 
- React Native (Expo) 
- TypeScript 
- React Navigation 
- React Hooks 
- AsyncStorage

All assignment requirements are implemented with proper cleanup and edge
case handling.
