export default function AccountForm() {
  // function filterAmountInput() {
  //   const amountArray = amount.split('');
  //   const numberVerify = amountArray.map((item: string) => parseInt(item));
  //   return numberVerify.every((item: unknown) => !Number.isNaN(item));
  // }

  // function sanitizeAmount() {
  //   if (!filterAmountInput()) {
  //     alert('Only use numbers for amount');
  //     return NaN;
  //   }
  //   const amountArray = amount.split('');
  //   const numberVerify = amountArray.map((item: string) => parseInt(item));
  //   if (numberVerify.filter((item: unknown) => Number.isNaN(item)).length > 0) {
  //     return NaN;
  //   } else {
  //     return Number(numberVerify.join(''));
  //   }
  // }

  return (
    <div>
      <input type="password" placeholder="please reenter your password" />
      <input type="text" placeholder="please enter either checking or savings" />
      <input type="currency" placeholder="please entered a currency as your default" />
    </div>
  );
}
