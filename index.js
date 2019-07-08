// let balance = 500.00;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for(let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("totoro");

console.log("inital balance", myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
console.log("initial commit result:", t1.commit());


t3 = new Deposit(120.00, myAccount);
console.log("commit result of +120:", t3.commit());

t2 = new Withdrawal(9.99, myAccount);
console.log("commit result of -9.99:", t2.commit());

// console.log("balance of total withdrawal:", myAccount.balance)

console.log(`final lance:`, myAccount.balance);

console.log("transaction history:", myAccount.transactions);

