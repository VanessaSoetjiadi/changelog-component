// determine the bottom list vertical line length
function mainListBottomVert () {
  // determining the top, middle heights
  const heights = [ 
    document.getElementById("main-list").clientHeight, 
    document.getElementById("main-list-top").clientHeight, document.getElementById("main-list-content").clientHeight 
  ]

  // determining the bottom height
  const bottomVertLineHeight = heights[0] - heights[1] - heights[2]

  // getting the bottom vertical line element
  const bottomMiddle = document.getElementById("main-list-bottom-middle")
  let vertLineBottomMiddle = bottomMiddle.getElementsByClassName('vert-line')[0] // selecting the (assumed) only element

  vertLineBottomMiddle.style.height = bottomVertLineHeight;
}

// adding new log to the html
function addNewLog (date, description) {
  // creating the space between the new element and the last element, for both left and right containers
  const space = document.createElement("div")
  space.classList.add("height-5vh")

  const spaceClone = space.cloneNode(true)

  document.getElementById("main-list-left-container").appendChild(space)
  document.getElementById("main-list-right-container").appendChild(spaceClone)

  // creating the line between the new element and the last element for the middle container
  const lineContainer = document.createElement("div")
  lineContainer.classList.add("main-list-middle-element")
  
  const line = document.createElement("div")
  line.classList.add("vert-line-between")

  lineContainer.appendChild(line)

  document.getElementById("main-list-middle-container").appendChild(lineContainer)

  // creating the new left element and appending it to the document
  const newElementLeft = document.createElement("div")
  newElementLeft.classList.add("main-list-left-element")
  
  const dateInp = document.createTextNode(date)
  newElementLeft.appendChild(dateInp)

  document.getElementById("main-list-left-container").appendChild(newElementLeft)

  // creating the new middle element
  const newElementMiddle = document.createElement("div")
  newElementMiddle.classList.add("main-list-middle-element")

  const circle = document.createElement("div")
  circle.classList.add("circ")

  newElementMiddle.appendChild(circle)

  document.getElementById("main-list-middle-container").appendChild(newElementMiddle)

  // creating the new middle element
  const newElementRight = document.createElement("div")
  newElementRight.classList.add("main-list-right-element")
  
  const desc = document.createTextNode(description)
  newElementRight.appendChild(desc)

  document.getElementById("main-list-right-container").appendChild(newElementRight)
}

function main () {
  mainListBottomVert();
  addNewLog("2 August 2214", "Gooning");
  addNewLog("2 August 2214", "Gooning");
  addNewLog("2 August 2214", "Gooning");
  addNewLog("2 August 2214", "Gooning");
  addNewLog("2 August 2214", "Gooning");
}

document.addEventListener('DOMContentLoaded', main);