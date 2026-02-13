# OTP Authentication App -- React Native (Expo + TypeScript)

## Project Overview

This project implements a Passwordless Authentication Flow using Email +
OTP. After successful verification, the user is navigated to a Session
Screen that tracks active session time.

------------------------------------------------------------------------

# 1. OTP Logic & Expiry Handling

## OTP Generation

-   A 6-digit random OTP is generated.
-   OTP expiry is set to 60 seconds from generation.
-   Attempts allowed: Maximum 3.

Expiry logic: expiry = Date.now() + 60000

## Validation Flow

1.  Check if OTP exists for the email.
2.  Check if OTP is expired.
3.  Check attempt count (max 3).
4.  Compare entered OTP with stored OTP.

Possible outcomes: - Incorrect OTP → attempt count increases. - Expired
OTP → error message. - Attempts exceeded → verification blocked. -
Correct OTP → navigate to session screen.

On success, OTP data is removed from storage.

------------------------------------------------------------------------

# 2. Data Structures Used & Why

## Email-keyed Object

{ email: { otp: string, expiry: number, attempts: number } }

Why? - O(1) lookup using email as key - Supports multiple users - Easy
update & deletion - Clean and scalable

## useRef

Used to store session start timestamp. Prevents reset on re-render.

## useState

Used to update timer UI every second.

## setInterval with Cleanup

Ensures timer runs continuously and stops on logout. Prevents memory
leaks.

------------------------------------------------------------------------

# 3. External SDK Used & Why

AsyncStorage

Why? - Lightweight - Local persistence without backend - Stores OTP
data - Works even after app reload

------------------------------------------------------------------------

# 4. GPT Usage Disclosure

I referred to GPT occasionally for small doubts and documentation
formatting. The authentication logic, expiry handling, session timer,
state management, and overall implementation were written and understood
by me.

------------------------------------------------------------------------

Tech Stack: - React Native (Expo) - TypeScript - React Hooks -
AsyncStorage

All assignment requirements are implemented with proper cleanup and edge
case handling.
