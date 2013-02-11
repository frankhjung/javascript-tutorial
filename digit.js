/*jslint indent: 4, maxlen: 80, rhino: true */
/*global java*/

// returns a semi-random digit between 0 and 9
function getRandomDigit() {
    'use strict';
    return Math.round(Math.random() * 9);
}

// example using array
var digitName = (function () {
    'use strict';
    var names = ['zero', 'one', 'two', 'three', 'four',
        'five', 'six', 'seven', 'eight', 'nine'];
    return function (n) {
        return names[n];
    };
}());

// example using associative array
var getDigitName = (function () {
    'use strict';
    var names = {0 : 'zero', 1 : 'one', 2 : 'two',
        3 : 'three', 4 : 'four', 5 : 'five',
        6 : 'six', 7 : 'seven', 8 : 'eight',
        9 : 'nine' };
    return function (n) {
        return names[n];
    };
}());

/*
 * MAIN
 */
print('Printing 10 random digits ...');
var i;
for (i = 0; i < 10; i += 1) {
    var randomDigit = getRandomDigit();
    print('\t' + i + ') ' + randomDigit + ' is ' + getDigitName(randomDigit));
}
