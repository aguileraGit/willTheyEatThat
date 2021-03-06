
//Define filenames
var people = [{
    "name": "Diego Aguilera",
    "fileName": "DiegoAguilera.md",
    "dislikeFoodList": [],
  },
  {
    "name": "Malia Aguilera",
    "fileName": "MaliaAguilera.md",
    "dislikeFoodList": []
  },
  {
    "name": "Daniela Aguilera",
    "fileName": "DanielaAguilera.md",
    "dislikeFoodList": []
  },
  {
    "name": "Dan Parcell",
    "fileName": "DanParcell.md",
    "dislikeFoodList": []
  },
  {
    "name": "Janeth Aguilera",
    "fileName": "JanethAguilera.md",
    "dislikeFoodList": []
  },
  {
    "name": "Macca Blackhart",
    "fileName": "MaccaBlackhart.md",
    "dislikeFoodList": []
  },
  {
    "name": "Michael Hinson",
    "fileName": "MichaelHinson.md",
    "dislikeFoodList": []
  },
  {
    "name": "Miguel Aguilera",
    "fileName": "MiguelAguilera.md",
    "dislikeFoodList": []
  },
  {
    "name": "Paula Parcell",
    "fileName": "PaulaParcell.md",
    "dislikeFoodList": []
  },
  {
    "name": "Heffrey Blackhart",
    "fileName": "HeffreyBlackhart.md",
    "dislikeFoodList": []
  },
]

//Page load events
window.addEventListener('load', function() {

  //Populate names on dropdown
  people.forEach(populateNameDropDown);

  //Import food they dislike from *.md to list
  people.forEach(populateDislikeFoodList);

  //Create Tabs
  people.forEach(populateTabs);

});


function populateTabs(item) {
  var tabNames = document.getElementById("tabsID");

  //id's can not have spaces. Replace with '-'
  var nameID = item['name'].replace(' ', '-')

  //Append tab by name
  $( '<li class="nav-item"><a class="nav-link" id="' + nameID + '-tab" href="#' + nameID + '" data-toggle="tab" role="tab" selected="false">' + item['name'] + '</a></li>' ).appendTo(tabNames);
}

//Display tab when clicked
// Creating tabs and divs didn't work in seperate function. Instead when
// a name is clicked on, it load the food, and creates the div on the fly
$('#tabsID').on('click', function (e) {
  console.log('Clicked tab')
  console.log(e.target.id)

  var nameSelected = String(e.target.id)

  //Get name to pull from dict
  nameSelected = nameSelected.replace('-', ' ')
  nameSelected = nameSelected.slice(0, -4)

  //Tab name is used later on
  var tabName = nameSelected.replace(' ', '-')

  //Loop through people to search for person and food
  var x;
  for (x of people) {
    if (x["name"] == nameSelected) {
      //Ugh. Big mistake here. In populateDislikeFoodList, when
      // pushing to x["dislikeFoodList"], I don't split it. I
      // actually send a string of all the food. Over and over.
      var listOfFoods = x["dislikeFoodList"][0].split('\n');
    }
  }

  //Generate list and write into HTML
  foodListText = '<ul class="list-group">'
  for (var listItem = 0; listItem < listOfFoods.length; listItem++) {
    foodListText += '<li class="list-group-item">'
    foodListText += listOfFoods[listItem]
    foodListText += '</li>'
  }
  foodListText += '</ul>'

  //Create DIV
  var htmlToAdd = '<div class="tab-pane" id='
  htmlToAdd += tabName
  htmlToAdd += ' role="tabpanel" aria-labelledby="profile-tab">'
  htmlToAdd += foodListText
  htmlToAdd += '</div>'

  //Add it
  document.getElementById("tabsContent").innerHTML += htmlToAdd;

  //Show Tab
  e.preventDefault()
  $(this).tab('show')
})


function populateNameDropDown(item) {
  var nameDropDown = document.getElementById("selectNameDropDown");

  var option = document.createElement("option");
  option.text = item["name"]
  nameDropDown.add(option)
}


//Populate food list per name
function populateDislikeFoodList(item) {
  //First we must open the file & call prarseFile Fn
  $.ajax({
    type: "GET",
    url: item["fileName"],
    dataType: "text",
    success: function(data) {

      //Split file by \n
      var lines = data.split('\n');

      for (var line = 0; line < lines.length; line++) {
        //Push each item into the array - Make lowercase to easily search for
        item["dislikeFoodList"].push(data.toLowerCase())
      }
    } //End Success
  }); //End ajax
}

function checkIfTheyLike() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var form = document.getElementById("foodTestingForm");

  //Make sure the user typed something in
  var textForm = document.getElementById("foodToTest")
  if (textForm.value.length < 1){
    textForm.classList.add('is-invalid');
    console.log('Invalid')
    return false;
  }

  textForm.classList.remove('is-invalid');
  textForm.classList.add('is-valid');


  //Get selected name and foodToTest
  var selectedName = document.getElementById("selectNameDropDown").value;
  var foodToTest = document.getElementById("foodToTest").value.toLowerCase();
  console.log(foodToTest)

  //Loop through people to search for person and food
  var x;
  for (x of people) {
    if (x["name"] == selectedName) {
      //Search foodToTest in person's list
      var foodDisliked = searchStringInArray(foodToTest, x["dislikeFoodList"])
      console.log(foodDisliked)

      //Display Dislike or Like
      if (foodDisliked == 'Like') {
        modalLike(x["name"], foodToTest);
      } else {
        modalDislike(x["name"], foodToTest)
      }
    }
  }

  return false;
}

//Use regex to search
function searchStringInArray(str, strArray) {
  //Create an empty pattern
  var pattern = ''

  //Remove any spaces at the end
  str = str.trim()

  //Another attempt to remove characters at the end
  str = str.replace(/[ |\t|\s]+$/gm, '');

  //Split search terms
  words = str.split(' ')

  for (i = 0; i < words.length; i++) {
    //Remove last char
    word = words[i].slice(0, -1)
    pattern += '(' + word + '[a-z]?)(\\b|s\\b|es\\b|ed\\b) '
  }

  //Remove last space
  pattern = pattern.slice(0, -1)

  //Add start/end
  pattern = '^' + pattern + '$'

  console.log(pattern)

  var regexPattern = new RegExp(pattern, 'gim')

  for (var j = 0; j < strArray.length; j++) {
    if (strArray[j].match(regexPattern)) return 'Dislike';
  }
  return 'Like';
}


function modalLike(name, food) {
  var msgs = [name + ' loves ' + food + '.',
    name + ' will eat ' + food + '.',
    name + ' loves ' + food + '. You should make seconds.',
    'Yum Yum Yum. That is a Go for ' + name + ' & ' + food + '.',
    name + ' loves ' + food + ' so much. '
  ]

  var msg = msgs[Math.floor(Math.random() * msgs.length)];

  //Update Modal Header
  document.getElementById("exampleModalLabel").innerHTML = 'Good News!';
  document.getElementById("modal-header").classList.remove("bg-success");
  document.getElementById("modal-header").classList.remove("bg-danger");
  document.getElementById("modal-header").classList.add('bg-success');

  //Update Modal Content
  document.getElementById("modal-body-text").innerHTML = msg;
  //Show modal
  $("#exampleModal").modal();

}

function modalDislike(name, food) {
  var msgs = [name + ' hates ' + food + '.',
    name + ' will not eat ' + food + '.',
    'You better not feed ' + name + ' ' + food + '.',
    'Do not feed ' + name + ' ' + food + '. He/She will not be happy.',
  ]

  var msg = msgs[Math.floor(Math.random() * msgs.length)];

  //Update Modal Header
  document.getElementById("exampleModalLabel").innerHTML = 'Bad News!';
  document.getElementById("modal-header").classList.remove("bg-success");
  document.getElementById("modal-header").classList.remove("bg-danger");
  document.getElementById("modal-header").classList.add('bg-danger');

  //Update Modal Content
  document.getElementById("modal-body-text").innerHTML = msg;
  //Show modal
  $("#exampleModal").modal();

}
