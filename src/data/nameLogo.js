function getFirstTwoLettersOfEmail(email) {
  const atIndex = email.indexOf('@');
  
  if (atIndex === -1) {
    return ''; // Return empty string if there's no '@' symbol
  }
  
  return email.slice(0, Math.min(2, atIndex));
}
export default getFirstTwoLettersOfEmail;
