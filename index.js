import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://mobileapp-da427-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const groceryListInDB = ref(database, "groceryList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const groceryListEl = document.getElementById("grocery-list")
const imgEl = document.querySelector("img");


imgEl.addEventListener("mouseover", function() {

    imgEl.src = "./cat-emoji2.gif"
}) 

imgEl.addEventListener("mouseleave", function() {
    imgEl.src = "./cat-emoji.gif"
})


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue != ""  &  inputValue !=" ") {
        resetInputEl();
    
        push(groceryListInDB, inputValue)
    }
    
    
    
    
})

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

function resetInputEl() {
    inputFieldEl.value = ""
}

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

function resetGroceryListEl() {
    groceryListEl.innerHTML = ""
}