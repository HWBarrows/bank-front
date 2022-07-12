export default function AccountForm() {
  //   parameter: { accountBalance: number },
  //   action: string,
  //   amount: number
  // ) {
  //   const oldBalance = parameter.accountBalance;

  //   function newBalance() {
  //     if (action == 'add') {
  //       const newBalanceAmount = oldBalance + amount;
  //       return newBalanceAmount;
  //     }
  //   }

  return (
    <div>
      <input type="password" placeholder="please reenter your password" />
      <input type="text" placeholder="please enter either checking or savings" />
      <input type="currency" placeholder="please entered a currency as your default" />
    </div>
  );
}
