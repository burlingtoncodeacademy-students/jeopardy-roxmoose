let wagerButton = document.getElementById("wager-button")
let p1wagerInput = document.getElementById("p1wager-input")
let p2wagerInput = document.getElementById("p2wager-input")
let p1wager = document.getElementById("p1wager")
let p2wager = document.getElementById("p2wager")
let finalQuestion = document.getElementById("final-question")
let wagerForm = document.getElementById("wager-form")
let finalButton = document.getElementById("final-button")
let p1finalInput = document.getElementById("p1final-input")
let p2finalInput = document.getElementById("p2final-input")
let finalForm = document.getElementById("final-form")
let p1final = document.getElementById("p1final")
let p2final = document.getElementById("p2final")
let finalAnswers = document.getElementById("final-answers")
let winner = document.getElementById("winner")

let p1score = document.getElementById("p1score")
let p2score = document.getElementById("p2score")

// Getting scores from the previous round:
let dehashed = document.location.hash.slice(1) // comes in as "score,score" e.g. "200,-500"
let splitDehashed = dehashed.split(',') // turning the string into an array, splitting around the comma, so we get ['score1', 'score2']
console.log("splitDehashed: ", splitDehashed)
p1score.value = splitDehashed[0] // player 1's score is at index 0. This gets their score as a string.
p1score.value = parseInt(p1score.value) // turning the value into an integer
p1score.textContent = p1score.value // making player 1's score show up
p2score.value = splitDehashed[1] // player 2's score is at index 1. This gets their score as a string.
p2score.value = parseInt(p2score.value) // turning the value into an integer
p2score.textContent = p2score.value // making player 2's score show up

finalForm.style.display = "none" // form to answer question hidden till question is showing
finalAnswers.style.display = "none" // final answers hidden till players have entered their answers

// Event listener for when players enter a wager:
wagerButton.addEventListener('click', (event)=> {
    event.preventDefault()
    //wagerButton.disabled = true // wager button disabled to block players from waging again
    p1wager.textContent = p1wagerInput.value
    p1wagerInput.value = ""
    p2wager.textContent = p2wagerInput.value
    p2wagerInput.value = ""
    finalQuestion.textContent = "The town in which Leslie Knope was born" // question replaces category name
    wagerForm.style.display = "none" // wager form disappears
    finalForm.style.display = "block" // final form shows up
})

// Event listener for when players answer the question:
finalButton.addEventListener('click', (event) => {
    event.preventDefault()
    finalForm.style.display = "none" // final form disappears
    finalAnswers.style.display = "block" // answers are displayed
    p1final.textContent = p1finalInput.value // Player 1's answer is displayed
    p2final.textContent = p2finalInput.value // Player 2's answer is displayed
    finalQuestion.textContent = "The correct answer is: Eagleton" // answer replaces the question

    console.log("p1finalInput.value: ", p1finalInput.value)

    if (p1finalInput.value === "Eagleton") {
        console.log("typeof(p1score.value): ",typeof(p1score.value))
        p1score.value += parseInt(p1wager.textContent)
        console.log("p1score.value: ", p1score.value)
        p1score.textContent = p1score.value
    } else {
        p1score.value -= parseInt(p1wager.textContent)
        p1score.textContent = p1score.value
    }

    if (p2finalInput.value === "Eagleton") {
        console.log("typeof(p2score.value): ",typeof(p2score.value))
        p2score.value += parseInt(p2wager.textContent)
        p2score.textContent = p2score.value
    } else {
        p2score.value -= parseInt(p2wager.textContent)
        p2score.textContent = p2score.value
    }

  

    // Displaying the winner(s)!
    if (p1score.value > p2score.value) {
        winner.textContent = "Player 1 won!"
    } else if (p1score.value === p2score.value) {
        winner.textContent = "It's a tie!"
    } else {
        winner.textContent = "Player 2 won!"
    }
    
})



