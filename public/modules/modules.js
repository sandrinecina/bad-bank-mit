var ui = {};
ui.navigation = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#" onclick="defaultModule()">BadBank</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadCreateAccount()">Create Account</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadLogin()">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadDeposit()">Deposit</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadWithdraw()">Withdraw</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadTransactions()">Transactions</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadBalance()">Balance</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadAllData()">AllData</a>
          </li>
        </ul>
      </div>
    </nav>
`;

ui.createAccount = `
    <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
        <div class="card-header">Create Account</div>
        <div class="card-body">
            Name<br>
            <input type="input" class="form-control" id="name" placeholder="Enter name"><br>
            Email address<br>
            <input type="input" class="form-control" id="email" placeholder="Enter email"><br>
            Password<br>
            <input type="password" class="form-control" id="password" placeholder="Enter password"><br>
            <button type="submit" class="btn" onclick="create()">Create Account</button>
            <div id='createStatus'></div>
        </div>
    </div>
`;

ui.login = `
    <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
        <div class="card-header">Log Into Your Account</div>
        <div class="card-body">
            Email address<br>
            <input type="input" class="form-control" id="loginEmail" placeholder="Enter your email"><br>
            Password<br>
            <input type="password" class="form-control" id="loginPassword" placeholder="Enter your password"><br>
            <button type="submit" class="btn" onclick="login()">Log into my account</button>
            <div id='loginStatus'></div>
        </div>
    </div>
`;

ui.deposit = `
    <div class="card text-white bg-secondary mb-3" style="max-width: 24rem;">
        <div class="card-header">Deposit Money Into Your Account</div>
        <div class="card-body">
            Email address<br>
            <input type="input" class="form-control" id="depositEmail" placeholder="Enter your email"><br>
            Amount<br>
            <input type="amount" class="form-control" id="depositAmount" placeholder="Enter the amount you want to deposit"><br>
            <button type="submit" class="btn" bg-primary onclick="deposit()">Deposit money</button>
            <div id='depositStatus'></div>
        </div>
    </div>
`;

ui.withdraw = `
    <div class="card text-white bg-secondary mb-3" style="max-width: 24rem;">
        <div class="card-header">Withdraw Money From Your Account</div>
        <div class="card-body">
            Email address<br>
            <input type="input" class="form-control" id="withdrawEmail" placeholder="Enter your email"><br>
            Amount<br>
            <input type="amount" class="form-control" id="withdrawAmount" placeholder="Enter the amount you want to withdraw"><br>
            <button type="submit" class="btn" onclick="withdraw()">Withdraw money</button>
            <div id='withdrawStatus'></div>
        </div>
    </div>
`;

ui.transactions = `
    <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
        <div class="card-header">List all transactions</div>
        <div class="card-body">
            Email address<br>
            <input type="input" class="form-control" id="transactionsEmail" placeholder="Enter your email"><br>
            <button type="submit" class="btn" onclick="transactions()">List transactions</button>
            <div id='transactions'></div>
        </div>
    </div>
`;

ui.balance = `
    <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
        <div class="card-header">List account balance</div>
        <div class="card-body">
            Email address<br>
            <input type="input" class="form-control" id="balanceEmail" placeholder="Enter your email"><br>
            <button type="submit" class="btn" onclick="balance()">Show account balance</button>
            <div id='balance'></div>
        </div>
    </div>
`;

ui.default = `
    <div class="card text-grey bg-white mb-3" style="max-width: 30rem;">
        <div class="card-header">Welcome on the Bad Bank's homepage</div>
        <div class="card-body">
        <img src="http://localhost:3000/bank.png" alt="Bad Bank logo" height="120" width="120">

        </div>
    </div>
`;


ui.allData = `
    <div onload="allData()">
        <div id='allData'>
        </div>
    </div>
`;

var target     = document.getElementById('target');
var navigation = document.getElementById('navigation');
navigation.innerHTML += ui.navigation;
//pour navigation, injecter le meme html sur toutes les pages

//mais pour le contenu de target, injecter contenu different selon les pages
var loadCreateAccount = function(){
    target.innerHTML = ui.createAccount;
};

var loadLogin = function(){
    target.innerHTML = ui.login;
};

var loadDeposit = function(){
    target.innerHTML = ui.deposit;
};

var loadWithdraw = function(){
    target.innerHTML = ui.withdraw;
};

var loadTransactions = function(){
    target.innerHTML = ui.transactions;
};

var loadBalance = function(){
    target.innerHTML = ui.balance;
};

var defaultModule = function(){
    target.innerHTML = ui.default;
};

var loadAllData = function(){
    target.innerHTML = ui.allData;
    allData();

};

defaultModule();
