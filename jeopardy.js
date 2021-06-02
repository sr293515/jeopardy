// 
const columns = 5;
const rows = 6;


// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

/** Get rows random category from API. // Hard ass hell
 *
 * Returns array of category ids
 */

 // get the category Id's from the API randomly.
async function getCategoryIds() {
    const res = await axios.get('https://jservice.io/api/categories?count=100');
    let randomResult = []
    // Used map to store all of the ID's in an Array;
    let categoryId = res.data.map(c => c.id); // All of the category id's into an array.
    // return an array from items of the categoryId array but randomly everytime the function is called.
    for (let i = 0; i < rows; i++) {
      let index = Math.floor(Math.random() * categoryId.length);
      randomResult.push(categoryId[index])
  }
    console.log(randomResult) 
    return randomResult // returns the random Id's.
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    const res = await axios.get(`https://jservice.io/api/category?id=${catId}`);
    const ListOfClues = res.data.clues
    const randomClues = []
    // Randomize the clues with Math.Random
    for (let i = 0; i < columns; i++) {
      let index = Math.floor(Math.random() * ListOfClues.length);
      randomClues.push(ListOfClues[index])
    }
    // map the randomClues array into a object with the question, answer as shown above
    let clues = randomClues.map(clue => ({
      question: clue.question,
      answer: clue.answer,
      showing: null,
    }));  
    // returned object with the title and the clues.
    console.log({ title: res.data.title, clues });
    console.log(clues)
    return { title: res.data.title, clues }
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function createTable() {
  const body = document.body
  const table = document.createElement('table')
  table.classList.add('jeopardy-table')
  const tHead = document.createElement('thead')
  tHead.classList.add('title-row')
  const tBody = document.createElement('tbody')
  tBody.classList.add('table-body')
  
  body.prepend(table)
  table.append(tHead)
  table.append(tBody)
}


async function fillTable() {

  // Add row with headers for categories
  const titleRow = document.querySelector('.title-row')
  titleRow.innerHTML = '';
  let tr = document.createElement('tr')
  for (let catIdx = 0; catIdx < rows; catIdx++) {
    const cell = document.createElement('th')
    cell.innerHTML = categories[catIdx].title;
    tr.append(cell)
  }
  titleRow.append(tr)
 
  // Add rows with questions for each category
  const tableBody = document.querySelector('.table-body')
  tableBody.innerHTML = '';
  for (let clueIdx = 0; clueIdx < columns; clueIdx++) {
    let tr = document.createElement('tr')
    for (let catIdx = 0; catIdx < rows; catIdx++) {
      const cell = document.createElement('td');
      tr.append(cell)
      cell.setAttribute('id', `${catIdx}-${clueIdx}`)
      cell.innerHTML = "?"
      tr.append(cell)
    }
    tableBody.append(tr);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

async function handleClick(event) {

  let clue = categories[catId].clues[clueIdx]
  let display;

  

}


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

/** Remove the loading spinner and update the button used to fetch data. */


/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */
async function setupAndStart() {
  let catIds = await getCategoryIds();
  
  categories = [];

  for (let categoryId of catIds) {
    categories.push(await getCategory(categoryId));
    // console.log(category)
  }
  createTable();
  fillTable();
  // console.log(catIds)
  console.log(categories)
}


/** On click of start / restart button, set up game. */

// TODO
const restartButton = document.getElementById('restart')
restartButton.addEventListener('click', function() {
  setupAndStart()
})
/** On page load, add event handler for clicking clues */



$(function () { // On page load
  setupAndStart();
  // $(".jeopardy-table").on("click", "td", function() {
  //   alert('clicked')
  // });
});

const clickableCell = document.querySelectorAll('.cell')
let clickHandler = function () {
  console.log('click just happened')
}

clickableCell.addEventListener('click', clickHandler)


// $(document).ready(function() {
//   $('.jeopardy-table td').click(function() {
//     console.log('clicked')
//      alert('clicked')
//   });
// });
// TODO