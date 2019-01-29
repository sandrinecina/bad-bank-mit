var express = require('express');
var app = express();
var cors = require('cors');
var low = require('lowdb');
var fs = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db = low(adapter);

// Lowdb doc : https://www.npmjs.com/package/lowdb
// Lodash doc : https://lodash.com/docs/4.17.11


// setup directory used to serve static files ---- OK
app.use(express.static('public'));

// allow Cross-Origin Resource Sharing (CORS) ---- OK
app.use(cors());

// initialize the database with defaults values ---- OK
db.defaults({
    accounts: [{
        name: '',
        email: '',
        balance: 0,
        password: '',
        transactions: []
    }]
}).write();


//audit function ---- OK
var audit = function(action, amount){
    var record = {
        action: action,
        amount: amount,
        timestamp: new Date()
    };
    return record;
};


//create new account ---- OK
app.get('/account/create/:name/:email/:password', function (req, res) {
    var message = '';

    //check if account already exists
    var account = db.get('accounts')
        .find({ email: req.params.email })
        .value();

    if (account) {
        message = 'Account already exists!';
    } else{
        //create a new account
        db.get('accounts')
            .push({
                "name" : req.params.name,
                "email" : req.params.email,
                "balance" : 0,
                "password"  : req.params.password,
                "transactions" : [audit('create',0)] // audit function permet de noter dans la db l'action (ici: create) et l'amount (ici: 0), ainsi que le timestamp
            })
            .write();

        message = 'Account sucessfully created!';
    }
        console.log(message)
});


//log into account ---- OK
app.get('/account/login/:email/:password', function (req, res) {
    var message = '';

    var account = db.get('accounts')
    .find({email: req.params.email, password: req.params.password})
    .value();

    if (account){
        message = 'Login successful';
    }
    else{
    // If fail, return null
        message = 'Invalid credentials, unable to login';
    }

        console.log(message)

});


//return account based on email ---- OK
app.get('/account/get/:email', function (req, res) {
    var message = '';

    var account = db.get('accounts')
        .find({ email: req.params.email })
        .value()

    console.log(account.name, account.email, account.balance, account.transactions);
});


//deposit money into account ---- OK
app.get('/account/deposit/:email/:amount', function (req, res) {
    var message = '';

    //look for account through email
    var account = db.get('accounts')
    .find({ email: req.params.email })
    .value()

    // Deposit amount for email balance
    // return success or failure string
    if (account) {
        var accountBalance = account.balance;
        var accountTransactions = account.transactions;

        // parse string to float
        var amount = parseFloat(req.params.amount);

        // add amount to balance
        var newBalance = accountBalance + amount;
        // record transaction
        var newTransaction = audit('deposit',amount);

        accountTransactions.push(newTransaction);

        db.get('accounts')
          .find({ email: req.params.email })
          .assign({ balance: newBalance, transactions: accountTransactions })
          .write()

        message = 'Deposit successful. New balance is ' + newBalance;
    } else {
        message = "Couldn't find an account with the given email";
    }

    console.log(message)

});


//withdraw money ---- OK
app.get('/account/withdraw/:email/:amount', function (req, res) {
    var message = '';

    //look for account through email
    var account = db.get('accounts')
    .find({ email: req.params.email })
    .value()

    // Withdraw amount from email balance
    // return success or failure string
    if (account)
    {
        // check if there is enough money on account: if yes:
        if(account.balance >= parseFloat(req.params.amount))
        {
        var accountBalance = account.balance;
        var accountTransactions = account.transactions;

        // parse string to float
        var amount = parseFloat(req.params.amount);

        // add amount to balance
        var newBalance = accountBalance - amount;
        // record transaction
        var newTransaction = audit('withdraw',amount);

        accountTransactions.push(newTransaction);

        db.get('accounts')
          .find({ email: req.params.email })
          .assign({ balance: newBalance, transactions: accountTransactions })
          .write()

        message = 'Withdrawal successful. New balance is ' + newBalance;
        }
        // if there is not enough money on account:
        else
        {
        message = "Insufficient balance";
        }
    }
    else
    {
        message = "Couldn't find an account with the given email";
    }

        console.log(message)
});


//return all transactions for account ---- OK
app.get('/account/transactions/:email', function (req, res) {

var transactions = db.get('accounts')
    .filter({ email: req.params.email }) // filters the accounts with the given email
    .map('transactions') // get these accounts' transactions
    .value()

    res.send({ transactions }); // send transactions back to the html layout
});


//return balance for account ---- OK
app.get('/account/balance/:email', function (req, res) {

    var account = db.get('accounts')
        .find({ email: req.params.email })
        .value()

    res.send({ balance: account.balance }); // send account.balance back to the html layout as 'balance'
});


// Return data for all accounts ---- OK
app.get('/account/all', function (req, res) {

    var accounts = db.get('accounts')
        .value(); // get all accounts from db

    res.send({ accounts }); // send accounts back to the html layout
});

// list all accounts when launching the server ---- OK
db.get('accounts')
    .map(function(account){
        console.log(account.email);
    })
    .value();

// start server ---- OK
app.listen(3000, function(){
    console.log('Running on port 3000');
});
