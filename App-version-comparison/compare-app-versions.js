// Check if using outdated version
function isOutdatedVersion(thisVersion, newVersion) {
  
  // Validate input params
  if (!thisVersion || !newVersion || typeof thisVersion != "string" || typeof newVersion != "string") {
    console.error("Invalid version specified");
    return true;
  }


  // equality comparison
  if (thisVersion == newVersion) return false;

  // split strings into objects
  thisVerArr = thisVersion.split(".");
  newVersionArr = newVersion.split(".");

  // compare objects in arrays
  result = true;
  for (i = 0; i < thisVerArr.length; i++) {
    // See if valid number
    if (isNaN(thisVerArr[i]) || isNaN(newVersionArr[i])) {
      console.error("Version number is invalid");
      return true;
    }

    // if this version is smaller than new version
    if (Number(thisVerArr[i]) < Number(newVersionArr[i])) return true;
    else if (Number(thisVerArr[i]) > Number(newVersionArr[i])) return false;
    result = false;
  }

  return result;
}

// Test: Equal
console.log(isOutdatedVersion("3.7.9", "3.7.9") === false);

// Test: outdated
console.log(isOutdatedVersion("3.6.3", "3.7.9") === true);
console.log(isOutdatedVersion("2.1", "20.1") === true);
console.log(isOutdatedVersion("3.7.10", "3.70.1") === true);

// Test: newer than newVersion
console.log(isOutdatedVersion("10.1", "1.1") === false);
console.log(isOutdatedVersion("3.7.10", "3.7.1") === false);

// Test: Invalid inputs
console.log(isOutdatedVersion("x", "99.7.1") === true);
console.log(isOutdatedVersion("x", "99.7.x") === true);
console.log(isOutdatedVersion("", "3.70.1") === true);
console.log(isOutdatedVersion("", "") === true);
console.log(isOutdatedVersion("3.7.10", "") === true);
console.log(isOutdatedVersion(null, 1.3) === true);
console.log(isOutdatedVersion("", "") === true);
