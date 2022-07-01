

var incomeDisplay = document.querySelector('#money-plus');
var expenseDisplay = document.querySelector('#money-minus');
var balanceDisplay = document.querySelector('#balance');
var transactionUl = document.querySelector('#transactions');
var form = document.querySelector('#form');
var inputTransactionName = document.querySelector('#text');
var inputTransactionAmount = document.querySelector('#amount');




let dummyTransactions = [
{ id:1 , name: 'Bolo de brigadeiro' , amount: -20 },
{ id:2 , name: 'salario' , amount: 300 },
{ id:3 , name: 'violao' , amount: 150 },
{ id:4 , name: 'Torta de frango' , amount: -10 },
]



var removeTransaction = ID =>{

	dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID);
	init();
}


var addTransactionIntoDOM = transaction => {

	var operator = transaction.amount < 0 ? '-' : '+';
	var CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
	var amountWithoutOperator = Math.abs(transaction.amount);
	var li = document.createElement('li')


	li.classList.add(CSSClass)
	li.innerHTML = `
		${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
		<button class="delete-btn" onClick="removeTransaction(${transaction.id})">
		x
		</button>
	`
	transactionUl.append(li)

}


var upadateBalanceValues = () =>{
	var transactionsAmounts = dummyTransactions.map(transaction => transaction.amount)
	var total = transactionsAmounts.reduce((accumulator,transaction) => accumulator + transaction, 0).toFixed(2);
	var income = transactionsAmounts.filter(value => value>0).reduce((accumulator,value) => accumulator + value,0).toFixed(2);
	var expense = Math.abs(transactionsAmounts.filter(value => value <0).reduce((accumulator,value) => accumulator + value,0)).toFixed(2);




	balanceDisplay.textContent = `R$ ${total}`;
	incomeDisplay.textContent = `R$ ${income}`;
	expenseDisplay.textContent = `R$ ${expense}`;
}

var init = () =>{
	transactionUl.innerHTML = '';
	dummyTransactions.forEach(addTransactionIntoDOM)
	upadateBalanceValues();
}


init();



var generateID = () => Math.round(Math.random()* 1000)



form.addEventListener("submit",event => {

	event.preventDefault()



	var transactionName = inputTransactionName.value.trim();
	var transactionAmount = inputTransactionAmount.value.trim();

	if(transactionName ==''|| transactionAmount == ''){
		alert("Por favor, preencha o nome e o valor da transaçao.");
		return;
	}


	var transaction = { id:generateID(), name: transactionName , amount: Number(transactionAmount)
	}

	dummyTransactions.push(transaction)
	init()

	inputTransactionName.value = '';
	inputTransactionAmount.value = '';
})