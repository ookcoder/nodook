const mapping = {  
    "OOOOO":"0",
    "oOOOO":"1",
    "ooOOO":"2",
    "oooOO":"3",
    "ooooO":"4",
    "ooooo":"5",
    "Ooooo":"6",
    "OOooo":"7",
    "OOOoo":"8",
    "OOOOo":"9",
    "oO":"a",
    "Oooo":"b",
    "OoOo":"c",
    "Ooo":"d",
    "o":"e",
    "ooOo":"f",
    "OOo":"g",
    "oooo":"h",
    "oo":"i",
    "oOOO":"j",
    "OoO":"k",
    "oOoo":"l",
    "OO":"m",
    "Oo":"n",
    "OOO":"o",
    "oOOo":"p",
    "OOoO":"q",
    "oOo":"r",
    "ooo":"s",
    "O":"t",
    "ooO":"u",
    "oooO":"v",
    "oOO":"w",
    "OooO":"x",
    "OoOO":"y",
    "OOoo":"z",
 };

 const reverseMapping = {  
    "0": "OOOOO",
    "1": "oOOOO",
    "2": "ooOOO",
    "3": "oooOO",
    "4": "ooooO",
    "5": "ooooo",
    "6": "Ooooo",
    "7": "OOooo",
    "8": "OOOoo",
    "9": "OOOOo",
    "a": "oO",
    "b": "Oooo",
    "c": "OoOo",
    "d": "Ooo",
    "e": "o",
    "f": "ooOo",
    "g": "OOo",
    "h": "oooo",
    "i": "oo",
    "j": "oOOO",
    "k": "OoO",
    "l": "oOoo",
    "m": "OO",
    "n": "Oo",
    "o": "OOO",
    "p": "oOOo",
    "q": "OOoO",
    "r": "oOo",
    "s": "ooo",
    "t": "O",
    "u": "ooO",
    "v": "oooO",
    "w": "oOO",
    "x": "OooO",
    "y": "OoOO",
    "z": "OOoo",
 };

// let text = "OOO0OOO0OoO0k oo0ooo0k oO0k OO0OOO0Oo0OoO0o0OoOO0k oOoo0oO0Oo0OOo0ooO0oO0OOo0o0k"

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
                answer += " " + letter + " "
            }
        }
        returnValue += answer + " "
    }

    return returnValue
    
}

function encode(text) {
    let returnValue = ""
    let words = text.split(" ");

    for (word of words) {
        let letters = word.split("");
    
        let answer = "";
        for (letter of letters) {
            if (reverseMapping[letter]) {
                answer += reverseMapping[letter]
            } else {
                answer += " " + letter + " "
            }
            answer += "0"
        }
        returnValue += answer + "k" + " "
    }    
    return returnValue
}

module.exports = { encode, decode, }

// for (let i = 0; i < text.length; i++) {
//     let number = parseInt(base3, 3)
// }


