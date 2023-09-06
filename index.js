import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://mobileapp-da427-default-rtdb.europe-west1.firebasedatabase.app/"
}

//Initialising the firebase database
const app = initializeApp(appSettings)
const database = getDatabase(app)
const groceryListInDB = ref(database, "groceryList")

//Getting the html elements from document
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const groceryListEl = document.getElementById("grocery-list")
const imgEl = document.querySelector("img");

// Event that changes the cat image when mouse is on the img element
imgEl.addEventListener("mouseover", function() {

    imgEl.src = "./cat-emoji2.gif"
}) 

// Event that changes the cat image when mouse leaves the img element
imgEl.addEventListener("mouseleave", function() {
    imgEl.src = "./cat-emoji.gif"
})

// Event added to button so that text from input field gets pushed to the database
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue != ""  &  inputValue !=" ") {
        resetInputEl();
    
        push(groceryListInDB, inputValue)
    }
    
    
})

// This function triggers whenever there is a change to database. It updates the grocery list by passing each item to the updateGroceryListEl()
onValue(groceryListInDB, function(snapshot) {

    if(snapshot.exists()) {
        let list = Object.entries(snapshot.val())
        let currentItem
        resetGroceryListEl()
        for(currentItem of list) {
            
            updateGroceryListEl(currentItem)
        }
    }
    else {
        groceryListEl.innerHTML = "<p>No items added yet...</p>"
    }
    
    

    
})

// Resets the input field
function resetInputEl() {
    inputFieldEl.value = ""
}

// Creates a new li element for each items from the database. Attaches each li element an event listener so that it get deleted onclick. Adds the li element to the grocery list to be displayed
function updateGroceryListEl(item) {
    
    let itemId = item[0]
    let itemValue = item[1]
    let newLiEl = document.createElement("li")
    newLiEl.textContent = itemValue

    newLiEl.addEventListener("click", function() {
        let pathToItemInDB = ref(database, `groceryList/${itemId}`)
        remove(pathToItemInDB)
    
       
    })


    groceryListEl.append(newLiEl)

}

// Resets the grocery list element
function resetGroceryListEl() {
    groceryListEl.innerHTML = ""
}

