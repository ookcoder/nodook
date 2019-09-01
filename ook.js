const mapping = {
    "OOOOO": "0",
    "oOOOO": "1",
    "ooOOO": "2",
    "oooOO": "3",
    "ooooO": "4",
    "ooooo": "5",
    "Ooooo": "6",
    "OOooo": "7",
    "OOOoo": "8",
    "OOOOo": "9",
    "oO": "a",
    "Oooo": "b",
    "OoOo": "c",
    "Ooo": "d",
    "o": "e",
    "ooOo": "f",
    "OOo": "g",
    "oooo": "h",
    "oo": "i",
    "oOOO": "j",
    "OoO": "k",
    "oOoo": "l",
    "OO": "m",
    "Oo": "n",
    "OOO": "o",
    "oOOo": "p",
    "OOoO": "q",
    "oOo": "r",
    "ooo": "s",
    "O": "t",
    "ooO": "u",
    "oooO": "v",
    "oOO": "w",
    "OooO": "x",
    "OoOO": "y",
    "OOoo": "z",
};

function decode(text) {
    let returnValue = ""
    let words = text.split(" ");
    for (word of words) {
        word = word.replace("k", "");
        let letters = word.split("0").filter(l => l != "");

        let answer = "";
        for (letter of letters) {
            if (mapping[letter]) {
                answer += mapping[letter]
            } else {
                answer += "?"
            }
        }
        returnValue += answer + " "
    }

    return returnValue

}

function objectFlip(obj) {
    const ret = {};
    Object.keys(obj).forEach((key) => {
        ret[obj[key]] = key;
    });
    return ret;
}

function encode(text) {
    text = text.toLowerCase();
    let returnValue = ""
    let words = text.split(" ");

    const reverseMapping = objectFlip(mapping);

    for (word of words) {
        let letters = word.split("");

        let answer = "";
        for (letter of letters) {
            if (reverseMapping[letter]) {
                answer += reverseMapping[letter]
            } else {
                answer += letter
            }
            answer += "0"
        }
        returnValue += answer + "k" + " "
    }
    return returnValue
}

module.exports = { encode, decode, }

// Run from command line
if (require.main === module) {
    if (process.argv[2] === "decode") {
        console.log(decode(process.argv[3]));
    } else {
        console.log(encode(process.argv[3]));
    }
}