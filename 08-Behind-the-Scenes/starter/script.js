'use strict';
// console.log(this)

// const calAge = function(birthYear) {
//     console.log(2025 - birthYear)
//     console.log(this)
// }

// `this` returns undefine in strict, or window object if not in strict mode
// calAge(1990)

// const calAgeArrow = birthYear => {
//     console.log(2025 - birthYear)
//     console.log(this)
// }

// `this` returns  window object because arrow functions don't get their own this
//  they return the this of the parent scope which in this case is the window object
// calAgeArrow(1990)

// in this case calcAge method `this` will point to the object that is calling the method
// which is the sheehan object. that is because sheehan object is calling the method.
// const sheehan = {
//     year: 1990,
//     calAge: function() {
//         console.log(this)
//         console.log(2025 - this.year)
//     },
// }
// sheehan.calAge();

// if we create another object
// const morgann = {
//     year: 1988,
// };

//we can borrow the method from sheehan
// morgann.calAge = sheehan.calAge;
//then the `this` keyword will point to the morgann object
// morgann.calAge();

//conclusion the `this` will always point to the object that calls the method

// interesting regular functions vs.arrow function examples

// greet arrow function example

// const sheehan = {
//     firstName: "Sheehan",
//     year: 1990,
//     calAge: function() {
//         console.log(this)
//         console.log(2025 - this.year);
//     },
//     greet: () => console.log(`Hey ${this.firstName}`),
// };
// sheehan.greet(); // returns Hey undefined because arrow functions don't have their own this, so the greet method `this`
// will point to the global scope. If we used var to define the firstName = 'Matilda' greet would actually return Hey Matilda
//NOTE: an object literal is not a code block

//we can avoid Hey undefined by using a regular function

// const sheehan = {
//     firstName: "Sheehan",
//     year: 1990,
//     calAge: function() {
//         console.log(this)
//         console.log(2025 - this.year);
//     },
//     greet: function() {console.log(`Hey ${this.firstName}`)},
// };
// sheehan.greet();

// Pitfall for `this` keyword is when you have a function inside of a method
// Using a regular function expression within calAge then calling it gives an TypeError of cannot read property year
// because a regular function call has the `this` keyword set to undefined


// const sheehan = {
//     firstName: "Sheehan",
//     year: 1990,
//     calAge: function() {
//         console.log(this)
//         console.log(2025 - this.year);
//         const isMillenial = function() {
//            console.log(this.year >=1981 && this.year <= 1996);
//         };
//         isMillenial();
//     },
//     greet: function() {console.log(`Hey ${this.firstName}`)},
// };
// sheehan.greet();
// sheehan.calAge();

// This problem has 2 solutions and old way(pre ES6) and an ES6 (and beyond) way
// Solution 1

// const sheehan = {
//     firstName: "Sheehan",
//     year: 1990,
//     calAge: function() {
//         console.log(this)
//         console.log(2025 - this.year);
//          // create another variable to preserve `this`
//         const self = this; //or could call it that - it still has access to this
//         const isMillenial = function() {
//              //change this to self
//            console.log(self.year >=1981 && self.year <= 1996);
//         };
//         isMillenial();
//     },
//     greet: function() {console.log(`Hey ${this.firstName}`)},
// };
// sheehan.greet();
// sheehan.calAge();

//Solution 2 ES6 solution, use an arrow function, as it will us the this from the parent scope

const sheehan = {
    firstName: "Sheehan",
    year: 1990,
    calAge: function() {
        console.log(this)
        console.log(2025 - this.year);
        const isMillenial = () => {
           console.log(this.year >=1981 && this.year <= 1996);
        }
        isMillenial();
    },
    greet: function() {console.log(`Hey ${this.firstName}`)},
};
sheehan.greet();
sheehan.calAge();
