'use strict'

//Declare function
function fruitProcessor(apples, oranges) {
    console.log(apples, oranges)
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice
}

// Call the function
fruitProcessor(5, 0);
// logs to the console 5 , 0 and returns juice, however we cannot see the actual juice string
// with this code. In order for us to do that we must log it to the console.

//This is cleaner in my opinion
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
// this way we captured the result of the function in a variable

// OR

// Than this
console.log(fruitProcessor(5,0))
//this way we didn't store the value


const appleOrangeJuice = fruitProcessor(5,9)
console.log(appleOrangeJuice);


// function expression is an anonymous function stored in a variable

const calcAge = function(birthYear) {
    return 2025 - birthYear;
}
const age = calcAge(1990)
console.log(age);


// Arrow functions single parameter

// const calAge2 = birthYear => 2025 - birthYear;
// const age2 = calAge2(1990);

// more complex arrow function

// const yearsUntilRetirement = birthYear => {
//     const age = 2025 - birthYear;
//     const retirement = 65 - age ;
//     return retirement;
// }

// const retirementStarts = yearsUntilRetirement(1990);
// console.log('retirement starts in ' + retirementStarts + ' years');

// arrow function with multiple parameters

// const yearsUntilRetirement2 = (birthYear, firstName ) => {
//     const age = 2025 - birthYear;
//     const retirement = 65 - age ;
//     return `${firstName} retires in ${retirement} years`;
// }

// const retirementStarts2 = yearsUntilRetirement2(1990, 'Sheehan');
// console.log(retirementStarts2);

//Reviewing functions

//regular function expression, calling another function

// const calAge = function(birthYear){
//     return 2025 - birthYear;
// }

// const yearsUntilRetirement = function (birthYear, firstName) {
//     const age = calAge(birthYear);
//     const retirement = 65 - age ;

//     if (retirement > 0 ){
//         console.log(`${firstName} retires in ${retirement} years`);
//         return retirement;
//     } else {
//         console.log(`${firstName} has already retired`)
//         return -1

//     }
// }

// const retirementStarts = yearsUntilRetirement(1990, 'Sheehan');
// const retirementStarted = yearsUntilRetirement(1960, 'Shirley');
// console.log(retirementStarts);
// console.log(retirementStarted);

const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str){
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ')
}

//Higher order function
const transformer = function(str, fn){
    console.log(`Original string: ${str}`)
    console.log(`Transformed String: ${fn(str)}`)
    console.log(`Transformed by: ${fn.name}`)
}

transformer('JavaScript is the best!', upperFirstWord)

// JS uses callback functions all the time

const high5 = function() {
    console.log('👋')
}

document.body.addEventListener('click', high5);
  ['Jonas', 'Sheehan', 'Morgann'].forEach(high5)


  // function that returns other functions

//   const greet = function(greeting) {
//     return function(name){
//         console.log(`${greeting} ${name}`)
//     }
//   }

//   const greeterHey = greet('Hey');
//   greeterHey('Jonas');
//   greeterHey('Sheehan');

  //arrow function

const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Sheehan');
