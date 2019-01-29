
function create() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var url = '/account/create/' + name + '/' + email + '/' + password;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                console.log(res.txt);
            }
        });
}

function login() {
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    var status = document.getElementById('loginStatus');
    var url = '/account/login/' + email + '/' + password;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                console.log(res.txt);
            }
        });
}

function deposit() {
    var email = document.getElementById('depositEmail').value;
    var amount = document.getElementById('depositAmount').value;
    var status = document.getElementById('depositStatus');
    var url = '/account/deposit/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                console.log(res.txt);
            }
        });
}

function withdraw() {
    var email = document.getElementById('withdrawEmail').value;
    var amount = document.getElementById('withdrawAmount').value;
    var status = document.getElementById('withdrawStatus');
    var url = '/account/withdraw/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                console.log(res.txt);
            }
        });
}

function transactions() {
    var email = document.getElementById('transactionsEmail').value;
    var transactions = document.getElementById('transactions');
    var url = '/account/transactions/' + email;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                console.log(res.txt);
                transactions.innerHTML = JSON.stringify(res.body.transactions);
            }
        });
}

function balance() {
    var email = document.getElementById('balanceEmail').value;
    var balance = document.getElementById('balance');
    var url = '/account/balance/' + email;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                console.log(res.txt);
                balance.innerHTML = JSON.stringify(res.body.balance);
            }
        });
}

function allData() {
    var data  = document.getElementById('allData');
    var url = '/account/all/';

    console.log('abc');

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                console.log(res.txt);
                data.innerHTML = JSON.stringify(res.body.accounts);
            }
        });
}

