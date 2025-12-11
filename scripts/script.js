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
    this.maxLogs = max;
    this.logCount = 0;
  }

  // adding a new Log to the html container, if log count < max then add the new log, if not then don't add the new log
  addNewLog (date, description) {
    if (this.checkMaxLog() === true) {
      console.log("❌ Max logs reached, not adding");
      return false;
    }

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

    this.logCount++;
  }

  // check if the log is maxed out or not
  checkMaxLog () {
    console.log(`Checking max log: ${this.logCount}/${this.maxLogs}`);
    return this.logCount >= this.maxLogs;
  }
}

class inputHandler {
  constructor (inputBoxName, submitButtonName) {
    this.input = document.getElementById(inputBoxName);
    this.button = document.getElementById(submitButtonName);
    this.githubAPI = githubAPI;
  }

  init() {
    this.bindEvents();
  }

  bindEvents () {
    this.input.addEventListener(("keypress"), this.handleKeyPress.bind(this));
    this.button.addEventListener(("click"), this.handleSubmit.bind(this));
  }

  handleKeyPress (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleSubmit(event);
    }
  }

  async andleSubmit(event) {
    event.preventDefault();
    
    const username = this.input.value.trim();
    
    if (username) {
      await this.githubAPI.getUserEvents(username);
    }

    this.input.value = "";
  }
}

class GithubAPI {
  constructor (logTracker) {
    this.logTracker = logTracker;
  }

  init () {}

  async getUserEvents (username) {
    try {
      await this.validateUsername(username)

      const response = await fetch (`https://api.github.com/users/${username}/events`)

      if (response.status != 200) {
        throw new Error ("API didn't return the user's Events")
      }

      const events = await response.json();
        
      if (!Array.isArray(events)) {
        throw new Error(`Expected array but got: ${typeof events}`);
      }

      events.forEach(event => {
        const date = new Date(event.created_at);
        const formatted = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
        
        const type = event.type;
        const repo = event.repo.name;

        const str = `${type} on ${repo}`

        this.logTracker.addNewLog(formatted, str);
      });
      
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async validateUsername (username) {
    try {
      fetch (`https://api.github.com/users/${username}`)
      .then(response => {
        if (response.status != 200) {
          throw new Error ("Couldn't find username")
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}

async function main () {
  const logTracker = new LogTracker(5)
  const dynContainer = new DynamicContainer();
  
  const formHandler = new inputHandler("usernameInput", "submitButton", githubAPI);
  formHandler.init();

  const githubAPI = new GithubAPI(logTracker);
  //await githubAPI.getUserEvents("VanessaSoetjiadi");

  dynContainer.readjustContainer();
}

document.addEventListener('DOMContentLoaded', main);