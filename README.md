# Jeopardy Board

Jeopardy! The great American quiz show has been a staple of network television since the 60s.  In this project we will be creating our own Jeopardy board which we will build the functionality for in later weeks. For now we're going to focus on site design and navigation.

This site will consist of 4 pages; a landing page, round 1 page, double jeopardy, and final jeopardy.

# Wireframes

## Landing Page

## Round 1

## Double Jeopardy

## Final Jeopardy

# Stories - Week 3

## The Landing Page

**Given** LiveServer is running

**When** the user visits `http://localhost:5500`

**Then** they should see the landing page

**And** there should be a centered title at the top of the page

**And** A centered image that represents your Jeopardy game (feel free to just use the Jeopardy logo)

**And** a "Start Game" button centered below the image

## Navigation Round 1

**Given** the user is on the landing page

**When** they click the Start Game button

**Then** they should be routed to the Round 1 page

## Round 1

**Given** the user is on the round 1 page

**Then** they should see a title, that indicates it's round 1

**And** a place to notify whose turn it is to turn a question

**And** a 6X6 grid with category names across the top row, and points from 100 - 500 below each category

**And** the grid should be centered on the page

**And** a text field, and two buttons, "Guess", and "Pass" centered below the grid

**And** a place to represent at least two scores

**And** a link in the lower right corner of the page

## Double Jeopardy Navigation

**Given** the user is on the round one page

**When** they click the link in the lower right corner

**Then** they should be taken to the double Jeopardy page

## Double Jeopardy

**Given** the user is on the Double Jeopardy page

**Then** they should see a title, that indicates it's Double Jeopardy

**And** a 6X6 grid with category names across the top row, and points from 200 - 1000 below each category

**And** the grid should be centered on the page

**And** a text field, and two buttons, "Guess", and "Pass" centered below the grid

**And** a place to represent at least two scores

**And** a link in the lower right corner of the page

## Final Jeopardy Navigation

**Given** the user is on the Double Jeopardy page

**When** they click the link in the lower right corner

**Then** they should be taken to the Final Jeopardy page

## Final Jeopardy

**Given** the user is on the Final Jeopardy page

**Then** they should see a title indicating it's Final Jeopardy

**And** a single section with a topic in it

**And** two forms
  * one with a field for the amount you want to bet.
  * one for the final answer, the button for which should be disabled

# Icebox

* When you first visit the homepage, it should play the Jeopardy theme
* The site should have animated elements
* Make the site fully mobile responsive

---

# Jeopardy Game

Jeopardy! The great American quiz show has been a staple of network television since the 60s.  In this project we will be creating our own Jeopardy games that will run in the browser using the awesome powers of HTML, CSS, and JavaScript!

The game of Jeopardy consists of several players that compete to earn points by selecting questions of varying points values from a board. The board is a 6 X 6 square with each column representing a category, and the first row containing the titles of each category, and every row after being increasingly difficult questions (with correspondingly higher point values) for their categories

If you don't want to have to come up with 61 individual questions you can use a site [like this one](https://perchance.org/jeopardy-question) to generate questions for you

# Stories - Week 4

## Ready, Set, Go!

**Given** the user is on the landing page

**When** the user clicks the 'Start Game' button

**Then** the user is redirected to the Round 1 page

**And** a URL fragment is added to the path to let the program know it's the multiplayer game

## Start the Game

**Given** the user has just been redirected to the Round 1 page

**When** the page loads

**Then** there is a notification that it is player 1's turn to choose

**And** the "Guess", and "Pass" question buttons are disabled

**And** a round timer begins counting down from 5 minutes

## Select a Question

**Given** an empty board, and player 1 is currently up

**When** the user selects a card

**Then** the score on the card is replaced by a question

**And** the "Submit Answer" button is enabled

**And** the "Pass Question" button is enabled

**And** a question timer begins counting down from 5 seconds

## Pass a Question

**Given** a question has been chosen

**When** the user clicks on the "Pass Question" button

**Then** player 2 gets an opportunity to answer the question

**And** the notification area changes to player 2's turn

**And** the question timer resets*

> *You should assume from here on out that any time a new question is chosen, or the player changes the question timer should reset

## Answer a Question Correctly

**Given** a question has been chosen

**When** the user submits an answer

**And** the answer is correct

**Then** the game awards the player the amount of points that were on the card

**And** the card is removed from the board

**And** the current player does not change

## Answer a Question Incorrectly

**Given** a question has been chosen

**When** the user submits an answer

**And** the answer is incorrect

**Then** the game subtracts the point total from the player's score

**And** the other player gets a chance to answer the question

**And** if no one guesses correctly the original player gets to choose a new question

## Score Board

**Given** the game has been started

**When** the score changes

**Then** the game should display each player's current score on the page

## Only Allow One Question

**Given** a card has been selected

**When** the user tries to pick a new card

**Then** the question does not change

**And** the game alerts the player that they must answer, or pass the question

## End Round 1

**Given** the Round timer has run out

**Or** the board has been cleared

**Then** the game automatically routes you to the Double Jeopardy page

**And** the game scores, and game logic remain the same

> Hint: You can use query parameters in the URL to pass score information between pages

## Final Jeopardy

**Given** Double Jeopardy has ended (either through clearing the board or time running out)

**When** the user is redirected to the Final Jeopardy page

**Then** they should be presented with a category

**And** prompted to make a wager up to their maximum point total

## Let's Make a Wager!

**Given** we're on the Final Jeopardy page

**When** all players have made a wager

**Then** the question is revealed

**And** all players get a chance to answer the question before the answer is revealed

## Winning the Game

**Given** all players have answered the final question

**When** the last answer is submitted

**Then** the amount wagered is added or subtracted from the total score

**And** the game should notify the users who won based on the final score

# Icebox

## More players

**Given** the user is on the landing page

**When** the user clicks "Start Game"

**Then** the game should ask how many players are playing

**And** create that number of players for score tracking

## Say my Name!

**Given** the the user is on the landing page

**When** the user clicks "Start Game"

**Then** the game should allow the user(s) to set their player names

**And** should use those names throughout the game

## Random Questions

**Given** a game has been started

**When** the board is generated

**Then** generate a random set of questions, and/or categories to be used for the game

## Daily Double

**Given** a game is started

**When** the board is generated

**Then** two random questions should be set as the "Daily Double" and are worth twice the amount of points on their cards
