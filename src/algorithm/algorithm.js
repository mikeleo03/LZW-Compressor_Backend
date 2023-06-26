// COMPRESSION LENGTH COMPARISON --------------
function calculateTotalCompressed(arr) {
    let totalcmp = 0;
    for (let i = 0; i < arr.length; i++) {
      totalcmp += String(arr[i]).length;
    }

    return totalcmp/arr.length;
}

// LZW ALGORITHM IMPLEMENTATION ------------------------
// LZW Compression
function compressLZW(data) {
    // Initialize dictionary
    let table = new Map();
    for (let i = 0; i <= 255; i++) {
        let ch = String.fromCharCode(i);
        table.set(ch, i);
    }
    
    // Preprocessing
    let word = '';
    word += data[0];
    let curChar = '';
    let result = [];
    let dictSize = 256;
    
    // Iterate all over the string
    for (let i = 0, len = data.length; i < len; i++) {
        // Check whether exist in dictionary
        if (i !== len - 1) {
            curChar += data[i + 1];
        }
        if (table.has(word + curChar)) {
            word += curChar;
        } else {
            result.push(table.get(word));
            table.set(word + curChar, dictSize);
            dictSize++;
            word = curChar;
        }
        curChar = "";
    }
    
    // Handle last chars
    result.push(table.get(word));

    // Calculate compression rate
    let rate = (result.length / data.length) * 100
    
    return [result, rate];
}

// LZW Decompression
function decompressLZW(compressedCodes) { 
    // Initialize Dictionary (inverse of compress)
    let table = new Map();
    for (let i = 0; i <= 255; i++) {
        let ch = String.fromCharCode(i);
        table.set(i, ch);
    }
    
    // Preprocessing
    let old = compressedCodes[0];
    let n;
    let stringval = table.get(old);
    let curChar = "";
    curChar += stringval[0];
    let result = '';
    result += stringval;
    let count = 256;
    for (let i = 0; i < compressedCodes.length - 1; i++) {
        n = compressedCodes[i + 1];
        if (!table.has(n)) {
            stringval = table.get(old);
            stringval = stringval + curChar;
        } else {
            stringval = table.get(n);
        }
        result += stringval;
        curChar = "";
        curChar += stringval[0];
        table.set(count, table.get(old) + curChar);
        count++;
        old = n;
    }
    
    // Calculate decompression rate
    let rate = (compressedCodes.length / result.length) * 100
    
    return [result, rate];
}

// BWT ALGORITHM IMPLEMENTATION ------------------------
// Add end chars
const bwt_end = 0;

// BWT Encoding Suffix
function computeSuffixArray(arr) {
    let suff = [];
    for (let i = 0; i < arr.length; i++) {
        const suffix = arr.slice(i).concat(arr.slice(0, i));
        suff.push([i, suffix]);
    }
    return suff;
}

// BWT Encoding sort
function bwtEncodingSort(a, b) {
    if (a == bwt_end) {
        return -1;
    } else if (b == bwt_end) {
        return 1;
    }
    return a[1] < b[1] ? -1 : 1;
}

// BWT Encoding
function encodingBWT(array) {
    // Add EOF to the end of the array
    array.push(bwt_end);
    
    // Compute the suffix_array
    let suff = computeSuffixArray(array);
    suff.sort(bwtEncodingSort);

    // Process mapping to return just the last
    suff = suff.map(function(x) {
        return x[0];
    });

    // Get the last column
    let res = [];
    for (let i = 0; i < suff.length; i++) {
        if (suff[i] == 0) {
            res.push(bwt_end);
        } else {
            res.push(array[suff[i] - 1]);
        }
    }

    return res;
}

// BWT Decoding
function decodingBWT(encoded) {
    // initialize variables
    const len  = encoded.length;
    const sorted = encoded.slice().sort();
    const shift = Array(len).fill(0);
    const arr = new Map();
    let idx = encoded.indexOf(bwt_end);

    for (let i = 0; i < len; i++){
        if (arr[encoded[i]] == undefined) {
            arr[encoded[i]] = [i];
        } else {
            arr[encoded[i]].push(i);
        }
    }

    for (let i = 0; i < len; i++){
        shift[i] = arr[sorted[i]].shift();
    }

    const res = Array(len).fill(0);
    for (let i = 0; i < len; i++){
        res[i] = sorted[idx];
        idx = shift[idx];
    }

    // Remove the main block char
    res.pop();
    return res;
}

// MTF ALGORITHM IMPLEMENTATION --------------------------------
// Char presedence builidng
function buildCharList() {
    let result = '';

    // Add digits
    for (let i = 48; i <= 57; i++) {
        result += String.fromCharCode(i);
    }

    // Add space
    result += String.fromCharCode(32);

    // Add lowercase letters
    for (let i = 97; i <= 122; i++) {
        result += String.fromCharCode(i);
    }

    // Add uppercase letters
    for (let i = 65; i <= 90; i++) {
        result += String.fromCharCode(i);
    }

    // Add remaining characters
    for (let i = 33; i <= 254; i++) {
        if (
            (i >= 97 && i <= 122) ||
            (i >= 65 && i <= 90) ||
            (i >= 48 && i <= 57)
        ) {
            continue;
        }
        result += String.fromCharCode(i);
    }

    return result;
}

// MTF Compression
function compressMTF(word) {
    let casted = word.join(" ");
    var init = { wordAsNumbers: [], charList: buildCharList().split('') };
  
    let result = casted.split('').reduce(function(acc, char) {
        var charNum = acc.charList.indexOf(char); //get index of char
        acc.wordAsNumbers.push(charNum); //add original index to acc
        acc.charList.unshift(acc.charList.splice(charNum, 1)[0]); //put at beginning of list
        return acc;
    }, init).wordAsNumbers; //return number list

    // Calculate compression rate
    let rate = (calculateTotalCompressed(result) / calculateTotalCompressed(word)) * 100
    
    return [result, rate];
}

// MTF Decompression
function decompressMTF(numList) {
    var init = { word: '', charList: buildCharList().split('') };
  
    numList.reduce(function(acc, num) {
        acc.word += acc.charList[num];
        acc.charList.unshift(acc.charList.splice(num, 1)[0]); // put at beginning of list
        return acc;
    }, init).word;

    let stringArray = init.word.split(' ');
    let result = stringArray.map(str => parseInt(str, 10));

    // Calculate decompression rate
    let rate = (calculateTotalCompressed(numList) / calculateTotalCompressed(result)) * 100
    
    return [result, rate];
}

// MAIN COMPRESSION ALGORITHM IMPLEMENTATION --------------------------------
// Main compression algorithm
function compress(string, enhanced) {
    let [lzwres, lzwrat] = compressLZW(string);
    let ratio;

    // If not enhanced, just do the normal lzw
    // if enhanced, do the BWT following by MTF
    let compressedString = '';
    if (enhanced === 'true') {
        let bwtres = encodingBWT(lzwres)
        let [result, rat1] = compressMTF(bwtres);
        compressedString = result;
        ratio = lzwrat * rat1 / 100;
    } else {
        compressedString = lzwres;
        ratio = lzwrat;
    }

    // Convert compressed codes to binary number with spaces
    let binaryString = compressedString
        .map((code) => code.toString(2).padStart(8, "0"))
        .join(" ");
  
    return [binaryString, ratio];
}

// Main decompression algorithm
function decompress(binaryString, enhanced) {
    let compressedCodes = [];
    
    // Convert binary string to compressed codes
    let binaryArray = binaryString.split(" ");
    for (let i = 0; i < binaryArray.length; i++) {
        let binaryCode = binaryArray[i];
        let code = parseInt(binaryCode, 2);
        compressedCodes.push(code);
    }

    // If not enhanced, just return the normal lzw
    // Else, decode the compressed by MTF then BWT
    let decompressedArray = [];
    let ratio = 1;

    if (enhanced === 'true') {
        let [result, rat1] = decompressMTF(compressedCodes);
        let bwtres = decodingBWT(result)
        decompressedArray = bwtres;
        ratio *= rat1 / 100;
    } else {
        decompressedArray = compressedCodes;
    }

    let [reslzw, ratlzw] = decompressLZW(decompressedArray);
    ratio *= ratlzw;

    return [reslzw, ratio];
}

export { compress, decompress };
  