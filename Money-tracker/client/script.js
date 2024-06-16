let expences = [];
let totalAmount = 0;
const categorySelect = document.getElementById("category-select")
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input")
const addBtn = document.getElementById("add-btn")
const expenceTableBody = document.getElementById("expence-table-body")
const totalAmountCell = document.getElementById("total-amount")

addBtn.addEventListener('click',function(){
    const category = categorySelect.value;
    const amount = Number(amountInput.value)
    const date = dateInput.value;

    if(category === ''){
        alert('plz select a category')
        return;

    }
    if(isNaN(amount) || amount <=0 ){
        alert('plz enter a valid amount ');
         return;
    }
    if (date === ''){
        alert('plz select a valid date ')
        return;
    }
    expences.push({category,amount,date})

    totalAmount  += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expenceTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn')
    deleteBtn.addEventListener('click', function(){
        expences.splice(expences.indexOf(expences),1);

        totalAmount -= expences.amount;
        totalAmount.textContent = totalAmount;

        expenceTableBody.removeChild(newRow);
    })
    const expence = expences[expences.length - 1];
    categoryCell.textContent = expence.category;
    amountCell.textContent = expence.amount;
    dateCell.textContent = expence.date;
    deleteCell.appendChild(deleteBtn);

})
for (const expence of expences) {
    totalAmount  += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expenceTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn')
    deleteBtn.addEventListener('click', function(){
        expences.splice(expences.indexOf(expences),1);

        totalAmount -= expences.amount;
        totalAmount.textContent = totalAmount;

        expenceTableBody.removeChild(newRow);
    })
    const expence = expences[expences.length - 1];
    categoryCell.textContent = expence.category;
    amountCell.textContent = expence.amount;
    dateCell.textContent = expence.date;
    deleteCell.appendChild(deleteBtn);

}