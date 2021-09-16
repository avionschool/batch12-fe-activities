let quotes = [
  '“The Best Way To Get Started Is To Quit Talking And Begin Doing.” – Walt Disney',
  '“The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.” – Winston Churchill',
  '“Don’t Let Yesterday Take Up Too Much Of Today.” – Will Rogers',
  '“You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character.” – Unknown',
  '“It’s Not Whether You Get Knocked Down, It’s Whether You Get Up.” – Inspirational Quote By Vince Lombardi',
  '“If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You.” – Steve Jobs',
  '“People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do.” – Rob Siltanen',
  '“Failure Will Never Overtake Me If My Determination To Succeed Is Strong Enough.” – Og Mandino',
  '“Entrepreneurs Are Great At Dealing With Uncertainty And Also Very Good At Minimizing Risk. That’s The Classic Entrepreneur.” – Mohnish Pabrai',
  '“We May Encounter Many Defeats But We Must Not Be Defeated.” – Maya Angelou',
  '“Knowing Is Not Enough; We Must Apply. Wishing Is Not Enough; We Must Do.” – Johann Wolfgang Von Goethe'
];

//quote variable
let quoteDisplay = document.getElementById('quoteDisplay');

function newQuote() {
  let randomNumber = Math.floor(Math.random() * (quotes.length));
  quoteDisplay.innerHTML = quotes[randomNumber];
}



////////////////// 
//Modal 
/////////////////
// Variables
const quote_modal_container = document.querySelector('.quote-modal-container');
const quote_closeBtn = document.querySelector('.quote-close');
const quote_inputBox = document.querySelector(".quote-inputField input");
const quote_addBtn = document.querySelector(".quote-inputField button");

quote_inputBox.onkeyup = () => {
  let userData = quote_inputBox.value; //getting user entered value
  if (userData.trim() != 0) {
    quote_addBtn.classList.add('active'); //active add btn
  } else {
    quote_addBtn.classList.remove('active'); //unactive add btn
  }
}


//when user click the add button
quote_addBtn.onclick = () => {
  let userData = quote_inputBox.value;    
  quotes.push(userData);
  console.log(quotes);
  quote_inputBox.value = ''; //once added input field will be blank
  quote_addBtn.classList.remove('active'); //unactive add btn
}

//when user pres the enter key
quote_inputBox.addEventListener("keypress", (e) => {
  let userData = quote_inputBox.value;    
  if (userData.length > 0 && e.keyCode === 13) {
    let userData = quote_inputBox.value;    
  quotes.push(userData);
  console.log(quotes);
  quote_inputBox.value = ''; //once added input field will be blank
  quote_addBtn.classList.remove('active'); //unactive add btn
  }
}); 

//open the modal when clicked
quoteDisplay.addEventListener('click', () => {
  quote_modal_container.classList.add('show');
});

//close the modal when clicked
quote_closeBtn.addEventListener('click', () => {
  quote_modal_container.classList.remove('show');
});


newQuote();










const students = [
  { name: 'Manny', city: 'Manila' },
  { name: 'jose', city: 'intramuros' },
  { name: 'ana', city: 'mandaluyong' }
];

for (const student of students) {
  const { name, city } = student;
  console.log(student);
  console.log(`${name} lives in ${city}`);
}

function buy(food = 'chicharon') {
  if (food === 'chicharon') {
    console.log(`I'm going to buy ${food} from the sari-sari store`);
  } else {
    console.log(`I'm going to buy something from the sari-sari store`);
  }
}
  
buy();