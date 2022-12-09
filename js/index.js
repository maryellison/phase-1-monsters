// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

//We know we to fetch
//where we want to fetch
    //http://localhost:3000/monsters/?_limit=20&_page=1
//we have data, what do we want to do with it?
// show each monster age name and description
    //forEach
    //show data

    //STEP ONE: variable monsterContainer, event DOMContentLoaded, and callback/fetch fetchMonster()
    // fetch data from this url http://localhost:3000/monsters/?_limit=20&_page=1
    // show each monster age name and description
    //forEach
    //show data
    
    //STEP TWO: createForm()
    // Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.

    //STEP THREE: postNewMonster()
    //At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

    let monsterContainer = document.querySelector("#monster-container") 
        // grabs the given container in the HTML for monster information by the container's #id and placed outside the fetch() means I can always have access to my container
        
    document.addEventListener("DOMContentLoaded", () => {   
        fetchMonster()
        createForm() // without this, the function below is declared but not being used/called

        // can run <let form = document.querySelector("#monster-form")> and <console.log("DOM Form", form)> to check the form and errors, before making it an eventListener for postNewMonster()

        document.querySelector("#monster-form").addEventListener('submit', (e) => {
           e.preventDefault()
           //debugger; stops the code running here so you can check for children/values needed for postNewMonster, if needed, by looking for the event.target in the console. The hard way. Better to make the object below.
           let name = document.querySelector('#monster-name').value // defines the variable for monsterObj and grabs its value
           let age = document.querySelector('#monster-age').value
           let description = document.querySelector('#monster-description').value

           monsterObj = {
                name,
                age,
                description // doesn't need to be <description: description,> because it shares the same name
           }

           console.log(monsterObj) //to check
           postNewMonster(monsterObj) // make a function that will need to take in new data inside the event Listener

        })
    }) 
    
    const createForm = () => {
        let formContainer = document.querySelector("#create-monster")
        //console.log(formContainer) check to see what the query is actually selecting
        let form = document.createElement('form') // makes the form
        form.id = 'monster-form'
        let nameInput = document.createElement('input') // separate elements to the form
        let nameLabel = document.createElement('label') // creates the labels in the input elements
        let ageInput = document.createElement('input') 
        let ageLabel = document.createElement('label') 
        let descriptionInput = document.createElement('input')
        let descriptionLabel = document.createElement('label') 
        let h2 = document.createElement('h2') // creates header for inputs
        let button = document.createElement('button')
        button.innerText = 'Make Monster!'
        nameInput.id = 'monster-name' //gives properties so we can grab it for postNewMonster()
        ageInput.id = 'monster-age'
        descriptionInput.id = 'monster-description'


        h2.innerHTML = 'Create Monster'
        nameLabel.innerText = 'Name: ' // creates value of label
        ageLabel.innerText = 'Age: '
        descriptionLabel.innerText = 'Description: '

        form.append(nameLabel, nameInput, ageLabel, ageInput, descriptionLabel, descriptionInput, button) // collects them to the form, should only have labels and inputs, place in order of appearance
        formContainer.append(h2, form) // collects them to the form filing container to be seen, additional HTML organizing should be appended here, like the h2
    }
    
    const postNewMonster = ({name, age, description}) => { // reason we made monsterObj was to be able to deconstruct the name, age, and description here as an argument
        fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                    },
            body: JSON.stringify({name, age, description})
        })
        .then(resp => resp.json())
        .then(monster => console.log(monster))
    }
    
    const fetchMonster = () => { // the fetch() needs to be placed in a function (here it's a function expression) so it can be called inside the DOMContentLoaded above
        let monsterContainer = document.querySelector("#monster-container") 
        console.log(monsterContainer)
        fetch('http://localhost:3000/monsters/?_limit=20&_page=1') // first promise
        // CHECK STATUS CONSOLE LOG
        // .then(resp => {
        //     console.log('resp.status', resp.status) // 200
        //     console.log('resp.ok', resp.ok) // true
        //     return resp.json() // starts second promise
        // })
        .then(resp => resp.json())
        // CONSOLE LOG THE API FETCH - you can call it whatever you like
        // .then(monsterData => {
        //     console.log('monsterData', monsterData)
        // })
        .then(monsterData => {
            console.log(monsterData) // check to see what the data actually looks like
            monsterData.forEach((monster) => {
                //we need to show each of these monsters
                //show name, age, and description
                //how?
                let card = document.createElement('div') // creates a card for the monster information
                let name = document.createElement('h2') // creates the HTML information
                let age = document.createElement('h4') // same
                let description = document.createElement('p') //same
                name.innerText = monster.name // innerText is better than innerHTML when working with a foreign API, you can't always trust it
                age.innerText = `Age: ${monster.age}` // to match the formatting of the demo HTML, string interpolation
                description.innerText = `Bio: ${monster.description}`

    
                card.append(name, age, description) // now we have moved the separate created elements into the card
                monsterContainer.append(card) // now we have placed that filled card into it's filing container and will appear on the page
            })
        })
    }