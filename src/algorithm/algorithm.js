// LZW Compression
function compressLZW(data) {
    // Initialize dictionary
    let dictionary = {};
    for (let i = 0; i < 256; i++) {
        dictionary[String.fromCharCode(i)] = i;
    }
    
    // Preprocessing
    let word = '';
    let result = [];
    let dictSize = 256;
    
    // Iterate all over the string
    for (let i = 0, len = data.length; i < len; i++) {
        let curChar = data[i];
        let joinedWord = word + curChar;
        
        // Check whether exist in dictionary
        if (dictionary.hasOwnProperty(joinedWord))  {
            word = joinedWord;
        } else {
            result.push(dictionary[word]);
            
            // Add wc to the dictionary.
            dictionary[joinedWord] = dictSize++;
            word = curChar;
        }
    }
    
    // Handle empty chars
    if (word !== '') {
        result.push(dictionary[word]);
    }
    
    return result;
}

// LZW Decompression
function decompressLZW(compressedCodes) { 
    // Initialize Dictionary (inverse of compress)
    let dictionary = {};
    for (let i = 0; i < 256; i++) {
        dictionary[i] = String.fromCharCode(i);
    }
    
    // Preprocessing
    let word = String.fromCharCode(compressedCodes[0]);
    let result = word;
    let entry = '';
    let dictSize = 256;
    
    // Iterate all over list of compressed string
    for (let i = 1, len = compressedCodes.length; i < len; i++) {
        let curNumber = compressedCodes[i];
        
        // Check to dictionary
        if (dictionary[curNumber] !== undefined) {
            entry = dictionary[curNumber];
        } else {
            if (curNumber === dictSize) {
                entry = word + word[0];
            } else {
                return null;
            }
        }

        result += entry;
        
        // Add word + entry[0] to dictionary
        dictionary[dictSize++] = word + entry[0];
        word = entry;
    }
    
    return result;
}

// Main compression algorithm
function compress(string) {
    let compressedString = compressLZW(string);

    // Convert compressed codes to binary number with spaces
    let binaryString = compressedString
        .map((code) => code.toString(2).padStart(8, "0"))
        .join(" ");
  
    return binaryString;
}

// Main decompression algorithm
function decompress(binaryString) {
    let compressedCodes = [];
    
    // Convert binary string to compressed codes
    let binaryArray = binaryString.split(" ");
    for (let i = 0; i < binaryArray.length; i++) {
        let binaryCode = binaryArray[i];
        let code = parseInt(binaryCode, 2);
        compressedCodes.push(code);
    }

    return decompressLZW(compressedCodes);
}

export { compress, decompress };
  