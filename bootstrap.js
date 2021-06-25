
const taskContainer =document.querySelector(".task_container");// using querySelector to select by class name

//whatever the task we create we will be storing in this array
let globalStore=[];




// ****************************


const generateNewCard = (taskData) => 
    `
    <div class="col-md-6 col-lg-4">
                <div class="card">
                  <div class="card-header d-flex justify-content-end gap-2">
                    <button type="button" class="btn btn-outline-primary">
                    <i class="fas fa-pen"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)">
                    <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i>
                    </button>
                  </div>
                  <img src=${taskData.imageUrl} alt=""/>
                  <div class="card-body">
                    <h5 class="card-title text-primary fw-bold">
                    ${taskData.taskTitle}
                    </h5>
                    <p class="card-text">
                   ${taskData.taskDescription}
                    </p>
                    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                  </div>
                  <div class="card-footer text-muted">
                    <button type="button" class="btn btn-primary rounded-pill float-end"> Add Task</button>
                  </div>
                </div>

              </div>
    `;

    // code for not deleting the card after refreshing the page
const loadInitialCardData = () =>{

  // localstorage to get tasky card data

  const getCardData = localStorage.getItem("tasky"); //to get the data data we use getItem

  // convert to normal object----------------------{cards} means is to destructuring the card

  const {cards} = JSON.parse(getCardData); //here we are converting string back to object

  // loop over those array of task object to create html card,

  cards.map((cardObject) => {

    // inject it to dom

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject)); 

    // update our globalStore
    globalStore.push(cardObject);
  }) 


};


const saveChanges = () => {
    const taskData={
        id: `${Date.now()}`,  //we are using date.now() because it will return unique no. of digit for us every second
        imageUrl: document.getElementById("imageurl").value, // getting the element by id...... we are using .value to get the value of the image url
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    // to add to the dom i.e to add the card
     taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData)); 


    //  pushing the data
    // first we are storing our data in array(code is upside on the page) then in localstorage
    
    globalStore.push(taskData);
    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));  //here we are converting the object to string   
      //setItem is used to add your data in localstorage,first we will add id then our data.....tasky is id here
    // stringify is to convert our data(object) into string

    
 };

 

//  delete the card

const deleteCard = (event) => {
  event = window.event;
  // ID
  const targetId = event.target.id;

  const tagname = event.target.targetName; //BUTTON





  // match the id of the element with the id inside the globalstore
  // if match found then remove

  globalStore = globalStore.filter((cardObject)=>cardObject.id !== targetId);
  localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

  // contact parent
  if(tagname==="BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }

};
      
// apply keyword we use above to include the browser object inside the function