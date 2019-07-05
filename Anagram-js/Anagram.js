var examples = [
    ["hello", "hlelo", true],
    ["scream", "creams", true],
    ["black", "cklab", true],
    ["object", "objekt", false],
    ["red", "bread", false],
    ["pews", "spew", true],
    ["banana", "nanaba", true],
  ];
  
  // function to convert string into a key/value pair of letters and their occurance in the string
  function stringToObject(str) {
    var obj = {};
  
    for (var i = 0; i < str.length; i++) {
      obj[str[i]] = obj[str[i]] ? obj[str[i]]++: 1;
    }
    return obj;
  }
  
  function isAnagram(str1, str2) {
  
    // Compare length
    if (str1.length != str2.length)
      return false
  
    // OPTION 1 - if you can use Underscore.js:
    // return _.isMatch(stringToObject(str1), stringToObject(str2));
  
    // OPTION 2 - if you can't use external libraries
    var obj1 = stringToObject(str1);
    var obj2 = stringToObject(str2);
  
    for (var property in obj1) {
      if (obj1.hasOwnProperty(property)) {
        if (!obj2[property] == obj1[property])
          return false;
      }
    }
    
    return true;
  }
  
  // Test the supplied examples
  for (var i = 0; i < examples.length; i++) {
    console.log(isAnagram(examples[i][0], examples[i][1]) == examples[i][2]);
  }