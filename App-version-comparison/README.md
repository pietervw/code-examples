# App version comparison example

A Javascipt function that compares app versions to determine which is newer. App versions can be strings of any length (i.e. "1.2", "3.2.1", or longer).

This code is commonly used to compare a user's installed app version with that of a repository maintained in the cloud to determine when an update is available.

## Considerations

1. Input params are two `strings`, one for current app version and one for the new app version
2. The `isOutDatedVersion` function returns `true` if outdated, `false` if the same or the `newVersion` is older version than `thisVersion`
3. Any invalid input params will return a result indicating outdated app version and error in the console.
