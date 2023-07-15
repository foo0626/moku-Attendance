// メールアドレス：trim()した後、空ではないこと。正しいフォーマットであること。
export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

// パスワード：空ではないこと。
export function validatePassword(password) {
  return password.length > 0;
}