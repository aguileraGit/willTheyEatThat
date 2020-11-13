# willTheyEatThat

A simple webpage to track your friends and family's crazy food dislikes.


## Usage
- Create a user.md file. This file contains the food they **dislike**.
- Edit myScript.js to include the user:
  ```
  {
    "name": "Some Name",
    "fileName": "someNameFile.md",
    "dislikeFoodList": []
  },
  ```
- Deploy using Netlify (or Github pages?)
- `people.forEach(populateNameDropDown);` will load the files and populate the dislikeFoodList

## Searching
- Searching is done via regular expressions. They can handle plurals and multiple words. It'll catch if a person doesn't like candy corn, but likes corn.

## Tracking
- Using Netlify to add Google Analytics to site.

## Forms
- Using Netlify to capture need food added via form.
