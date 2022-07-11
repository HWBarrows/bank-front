function getCardNumber() {
  const firstSet = Math.floor(Math.random() * 1000) + 8000;
  const secondSet = Math.floor(Math.random() * 9000) + 1000;
  const thirdSet = Math.floor(Math.random() * 9000) + 1000;
  const fourthSet = Math.floor(Math.random() * 9000) + 1000;
  return `${firstSet} ${secondSet} ${thirdSet} ${fourthSet}`;
}

function getSecurityCode() {
  return Math.floor(Math.random() * 900) + 100;
}

function getExpiry() {
  const dateStuff = new Date().toLocaleDateString();
  const expiryYear = (Number(dateStuff.split('/').pop()) + 10).toString();
  const expiryMonth = dateStuff.split('/').shift();
  const expiryArray = [expiryMonth, expiryYear];

  return expiryArray.join('/');
}

export { getCardNumber, getSecurityCode, getExpiry };
