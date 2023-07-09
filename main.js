const express = require("express")
const fs = require("fs")
const app = express();

app.use( express.static("public"));
app.use( express.json() );

app.get("/", Home);

app.route("/todo").get(GetTodo).post(PostTodo);

app.listen(3000, function()
{
	console.log("server is live")
})

function Home(req, res)
{   
	res.sendFile(__dirname+"/public/html/index.html")
}

function GetTodo(req, res)
{   
	
	getTodos(function(err, todos)
	{
		if (err)
		{
			res.send("error in reading data from file");
			res.end();
		}

        res.json(todos);
	})
}

function PostTodo(req, res)
{
	saveTodo(req.body, function()
	{
		res.end();
	})

}

function getTodos(callback)
{
	fs.readFile("./todo.txt","utf-8", function(err, data)
	{
		if(err)
		{  
			callback(err, null)
			return
		}
		
		callback(null, JSON.parse(data))
	})
}


function saveTodo(todo, callback)
{
	getTodos(function(err, todos)
	{
		todos.push(todo);

		fs.writeFile("./todo.txt",JSON.stringify(todos), function(err)
		{

			if(err)
			{
				callback(err, null)
				return
			}

			callback(null);
		})

	})
}