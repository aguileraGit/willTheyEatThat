//Set global vars

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
    "fileName": "MaliaAguilera.md",
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

});

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
        //Push each item into the array
        item["dislikeFoodList"].push(data)
        //console.log(lines[line]);
      }
    } //End Success
  }); //End ajax
}

function checkIfTheyLike() {

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var form = document.getElementById("foodTestingForm");


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
  var foodToTest = document.getElementById("foodToTest").value;

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
  for (var j = 0; j < strArray.length; j++) {
    if (strArray[j].match(str)) return 'Dislike';
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
    'Do not feed ' + name + ' ' + food + '. They will not be happy',
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
