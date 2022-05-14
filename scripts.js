const d = document,
    bill = d.querySelector('.bill .amount'),
    percentage = [...d.querySelectorAll('.percentage__btn[data-value]')],
    percentageCustom =  d.querySelector('.percentage__btn--input'),
    people = d.querySelector('.people .amount'),
    alertText = d.querySelector('.wrong'),
    reset = d.querySelector('.total__btn'),
    tipIndividual = d.querySelector('.total__tip h3'),
    totalIndividual = d.querySelector('.total__price h3');

let BillAmount = 0,
    PercentageAmount = 0,
    PeopleAmount = 0;

function billAmount() {
    BillAmount = parseInt(bill.value);
    if (BillAmount > 0 && PercentageAmount > 0 && PeopleAmount > 0) calculate();
    showError();
}

function percentageAmount() {
    PercentageAmount = parseInt(this.dataset.value) || parseInt(this.value);
    
    percentage.forEach(x => x.classList.remove('active'));
    percentageCustom.classList.remove('active');
    this.classList.add('active');
    
    if (BillAmount > 0 && PercentageAmount > 0 && PeopleAmount > 0) calculate();
    showError();
}

function peopleAmount() {
    PeopleAmount = parseInt(people.value);

    if (BillAmount > 0 && PercentageAmount > 0 && PeopleAmount > 0) calculate();
    showError();
}

function showError() {
    if (people.value < 1) {
        people.classList.add('error');
        alertText.classList.add('error');
    }
    else {
        people.classList.remove('error');
        alertText.classList.remove('error');
    }
}

function calculate() {
    const totalBill = BillAmount,
        totalPercentage = PercentageAmount,
        totalPeople = PeopleAmount;

    let tip = (totalBill * totalPercentage / 100) / totalPeople,
        price = (totalBill / totalPeople) + tip;

    tipIndividual.textContent = tip.toFixed(2);
    totalIndividual.textContent = price.toFixed(2);
    
    reset.classList.add('active');
    reset.addEventListener('click', resetBtn);
}

function resetBtn() {
    bill.value = '';
    people.value = '';

    BillAmount = 0;
    PercentageAmount = 0;
    PeopleAmount = 0;
    
    reset.classList.remove('active');
    percentage.forEach(x => x.classList.remove('active'));
    percentageCustom.classList.remove('active');
    
    tipIndividual.textContent = "0.00";
    totalIndividual.textContent = "0.00";
}

bill.addEventListener('change', billAmount);
percentage.forEach(btn => btn.addEventListener('click', percentageAmount));
percentageCustom.addEventListener('change', percentageAmount);
people.addEventListener('change', peopleAmount);
