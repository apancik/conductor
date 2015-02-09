/*
A simple password breaking example

Input is the dictionary of possible passwords. Output is the password which matches the has signature hardcoded in the program.

Pseudo hash algorithm isn't really hashing and it is put there only for demonstrational purposes.
*/
var wastingCoeficient = 100000000;

function pseudoHash(input) {
    var bytes;

    // purposefully waste a lot of time redoing the work many times
    for (var wasting = 0; wasting < 100000000; wasting++) {
        bytes = [];
        
        for (var index = 0; index < input.length; index++) {
            bytes.push(input.charCodeAt(index));
        }
    }
    
    return bytes.join("");
}

function run(data) {
    var password = data[0];

    // check if the input string has the hash we are looking for
    if (pseudoHash(password) === "11297115115119111114100") {
        return password;
    } else {
        return null;
    }
}