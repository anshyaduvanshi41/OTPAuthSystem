export interface OtpEntry {
  otp: string;
  expiry: number;
  attempts: number;
}

export type OtpStorage = {
  [email: string]: OtpEntry;
};