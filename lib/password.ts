import bcrypt from "bcrypt";

const saltRounds = 10; // Example salt rounds

interface HashPasswordResult {
  hashedPassword: string | null;
  success: boolean;
  error: Error | null;
}

interface ComparePasswordResult {
  isMatch: boolean;
  success: boolean;
  error: Error | null;
}

export async function hashPassword(
  password: string
): Promise<HashPasswordResult> {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password:", hash);
    return { hashedPassword: hash, success: true, error: null };
  } catch (err: any) {
    console.error(err);
    console.log(typeof err);
    return { hashedPassword: null, success: false, error: err };
  }
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<ComparePasswordResult> {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    if (match) {
      console.log("Passwords match");
      return { isMatch: true, success: true, error: null };
    } else {
      console.log("Passwords do not match");
      return { isMatch: false, success: true, error: null };
    }
  } catch (err: any) {
    console.error(err);
    return { isMatch: false, success: false, error: err };
  }
}
