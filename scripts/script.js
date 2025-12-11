class DynamicContainer {
  constructor () {}

  initializeContainer () {
    this.fixMainListBottomVertLineHeight ();
  }

  readjustContainer () {
    // fixing the bottom components
    this.fixMainListBottomRowHeight();
    this.fixMainListBottomVertLineHeight ();
  }

  // determine the bottom list vertical line length
  fixMainListBottomVertLineHeight () {
    // get the bottom container height
    const bottomContainerHeight = this.fixMainListBottomRowHeight();

    const bottomVertLineContainer = document.getElementById("main-list-bottom-middle");

    // bottom container will never have additional lines
    const bottomVertLine = bottomVertLineContainer.childNodes[1];

    bottomVertLine.style.height = bottomContainerHeight;
  }

  // readjust the bottom container height
 fixMainListBottomRowHeight () {
    // getting the top, middle component height
    const listComponentHeights = [
      document.getElementById("main-list-top").clientHeight,
      document.getElementById("main-list-content").clientHeight,
    ]

    // getting the main list height to be subtracted from
    let bottomContainerHeight = document.getElementById("main-list").clientHeight;

    listComponentHeights.forEach(componentHeight => {
      bottomContainerHeight = bottomContainerHeight - componentHeight;
    })

    document.getElementById("main-list-bottom").style.height = bottomContainerHeight;

    return bottomContainerHeight;
  }
}

class LogTracker {
  constructor (max) {
    this.maxLogCount = max;
  }

  // adding a new Log to the html container
  addNewLog (date, description) {
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

  // check if the log is maxed out or not, if not then add a new Log to fil in the spaces; true if number of logs > max, false if not
  checkMaxLog () {
    const leftContainer = Array.from(document.getElementById("main-list-left-container").children)
    if (!leftContainer) return false;

    let count = 0;
    for (let element of leftContainer) {
      const eClass = element.classList;

      if (eClass.contains("main-list-left-element")) {
        count++;
        
        if (count > this.max) return true;
      };
    }
    return false;
  }
}

// functions for input form
const input = document.getElementById("usernameInput");

input.addEventListener(("keypress"), function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    logUsername();
  }
})

function logUsername () {
  // get the username
  const username = input.value.trim();

  if (username) {
    console.log(username);
    
    // clear the input box
    input.value = "";
  }
}

function main () {
  const logTracker = new LogTracker(5)
  const dynContainer = new DynamicContainer();

  // initializing the container 
  dynContainer.initializeContainer();
  
  logTracker.addNewLog("2 August 2214", "Gooning");

  dynContainer.readjustContainer();
}

document.addEventListener('DOMContentLoaded', main);