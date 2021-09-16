// class Player {
//   constructor(name, country) {
//     this.name = name;
//     this.country = country;
//   }
//   introduce() {
//     console.log(`My name is ${this.name}, I was born in ${this.country}.`);
//   }
// }

// class BasketballPlayer extends Player {
//   constructor(name, country) {
//     super(name, country);
//     this.age = age;
//   }
//   intro() {
//     console.log(`${this.name} is ${this.age} years old and know to play Basketball`);
//   }
// }

// const player = new Player('messi', 'argentina');
// const newPlayer = new BasketballPlayer('lebron', 23);

// player.introduce();
// newPlayer.intro();


// const findUserData = (firstName, age, email) => {
//   return new Promise((resolve, reject) => {
//     const error = true;
//     if (error) {
//       reject(`Sorry try again`);
//     } else {
//       resolve(`${firstName} ${age} ${email}`);
//     }
//   })
// };

// findUserData('ralph', 10, 'ralph@sulit.com')
//   .then((success) => console.log(success))
//   .catch((error) => console.log(error));
import fetch from 'node-fetch';

let getJoke = async () => {
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  return response.json();
}

getJoke()
  .then(({ value }) => {
    console.log(value);
  });

