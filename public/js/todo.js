const input = document.getElementById("input");
const btn = document.getElementById("btn");
const parent = document.getElementById("parent");



var getAllTodosRequest = new XMLHttpRequest();

getAllTodosRequest.open("GET","http://localhost:3000/todo");

getAllTodosRequest.send();

getAllTodosRequest.addEventListener("load",function(){
     
      if (getAllTodosRequest.status === 200)
      { 
        var todos = JSON.parse(getAllTodosRequest.responseText);
        todos.forEach(function (value)
        {
          toDoTask(value.text);
        });
      }
      else
      {
        console.log("error occured in getAllTodoRequest!!");
      }

});











btn.addEventListener("click",function() {
  if(input.value === '\n'){
    input.value = "";
    return;
  }
  const value = input.value;
 
  if (!value)
  {
    btn.classList.add("warning");
    return;
  }
  
  btn.classList.remove("warning");

  toDoTask(value);

  input.value = "";
  
  
 
  var request = new XMLHttpRequest();
  request.open("POST","http://localhost:3000/todo");
  request.setRequestHeader("Content-Type","application/json");
  request.send( JSON.stringify({text : value}));
  
  request.addEventListener("load", function()
  {
    

    if(request.status !== 200)
    {
      console.log("Error!!!");
    }
    else
    {
      console.log("added!!!");
    }
  })
 
})





//------------------------------------------------------------------toDoTask function Definition------------------------------------------------------------------------
function toDoTask(task)
{
  var listItem = document.createElement("div");
  var para = document.createElement("p");
  para.innerText = task;
  para.style.display = "inline";

  var del = document.createElement("img");
  del.setAttribute("src", "./delete.png");
  del.style.width = "15px";
  del.style.height = "15px";
  del.style.float = "right";

  var line = document.createElement("hr");


 
  //updateadd(para,task,listItem);

  listItem.appendChild(para);
  listItem.appendChild(del);
  listItem.appendChild(line);

  parent.appendChild(listItem);
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

