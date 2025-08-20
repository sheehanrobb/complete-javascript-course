// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// Functions

console.log(addDeclaration(2,6))
console.log(addExpression(2,6))
console.log(addArrow(2,6))

function addDeclaration(a, b) {
    return a + b;
}

const addExpression = function (a, b) {
    return a + b;
}

const addArrow = (a, b) => a + b;

