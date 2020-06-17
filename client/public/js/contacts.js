const API_URL = 'http://localhost:3030';

// select elements 
const contactDiv = document.getElementById("contacts");
const showBtn= document.getElementById("edit");
const userCard = document.getElementById("userCard");
const contact = document.getElementById("contact");

window.addEventListener('load', ()=> {
	getContacts(API_URL+'/contacts');
});


const getContacts = (url)=>{
	fetch(url)
	.then(response=> response.json())
	.then(data=>  Display(data))
	.catch(err=> console.log(err));
}


const Display = (data)=>{
console.log(data);
data.contact.forEach(item=>{
		createDiv(item);       // create a div for each fetched item from db
	})
}

const createDiv = (item)=>{

	const div = document.createElement('div');
 
	div.innerHTML = `<div class="card ">
	  <div class="card-content mt-4">
	    <p class="title">  <i class="fa fa-user" ></i> ${item.Name}  </p>
	    <p class="subtitle"> <i class="fa fa-phone" ></i>
	      ${item.number}
	    </p>
	    <p class="subtitle"> <i class="fa fa-envelope" ></i>
	      ${item.Email}
	    </p>
	    <p class="subtitle">
	      ${item.Catagory}
	    </p>
	  </div>
	  <footer class="card-footer">
	    <p class="card-footer-item">
	      <span>
	      	<button id="edit" type="button" class="button is-link is-rounded" onclick="showCard(value);" value="${item._id}"> show more </button>
	      </span>
	    </p>
	  </footer>
	</div>
	<br><br>`;

	contactDiv.appendChild(div);
	 
}

const showCard = (id)=>{        // Expand to a bigger card when button is clicked

	contactDiv.style.display = 'none';

	fetch(API_URL+'/contacts/'+id)
	.then(response=> response.json())
	.then(data=>  card(data))
	.catch(err=> console.log(err));

}

const card = (data)=>
{	

	const item = data.contact[0];
	if(!item.URL)  item.URL = './icons/head.jpg';
	 const div1 = document.createElement('div');

	div1.innerHTML = `
	<div class="columns is-centered">
		<div  class="column is-half">
		<div class="card">
		<div class="card-image">
	    <figure class="image is-4by3">
	     	 <img src=${item.URL} /> 
		</figure>
  	</div>
	
	  <div class="card-content">
	    <p class="title">  <i class="fa fa-user" ></i> ${item.Name}  </p>
	    <p class="subtitle"> <i class="fa fa-phone" ></i>
	      ${item.number}
	    </p>
	    <p class="subtitle"> <i class="fa fa-envelope" ></i>
	      ${item.Email}
	    </p>
	    <p class="subtitle">
	      ${item.Catagory}
	    </p>
	  </div>
	  <footer class="card-footer">
	    <p class="card-footer-item">
	      <span>
	      	<a type="button" class="button is-link is-rounded" href="/contacts.html" ><i class="fa fa-arrow-circle-left"></i> </a>
	      </span>
	    </p>
	    <p class="card-footer-item">
	      <span>
	      	<button type="button" class="button is-danger is-rounded" onclick="remove(value);" value="${item._id}"> Delete </button>
	      </span>
	    </p>
	    <p class="card-footer-item">
	      <span>
	      	<button type="button" class="button is-success is-rounded" onclick="edit(value);" value="${item._id}"> Edit </button>
	      </span>
	    </p>
	  </footer>
	</div>
	</div>
	</div>`; 
	userCard.appendChild(div1);
}

const remove = (id) =>             // delete a contact
{
	fetch(API_URL+'/contacts/delete/'+id)
	.then(response=> {
		if(response.status == 200)
		userCard.style.display = 'none';
		document.getElementById('back').innerHTML =
		`<div class="container">
		<div class="columns is-centered">
			<div class="column is-half ">
			<span>
      			<a class="button is-success is-rounded"  href="/contacts.html" > Show All Contacts </a>
      		</span>
			</div>
		</div>
		</div>
		`;
	})
	.then(data=> console.log(data));
}

const edit = (id)=>{                     // Edit info of a contact
	 userCard.style.display='none';
	 fetch(API_URL+'/contacts/edit/'+id)
	.then(response=> response.json())
	.then(data=> change(data));

}

const change = (data) => {               // helper function of edit to display form with existing contact info
	console.log(data);
	const item = data;
	const edit = document.getElementById("change");
	const editDiv = document.createElement('div'); 
	editDiv.innerHTML=`<form class="contact-form" id="contact-form"> 
	<div class="field">
	  <label class="label">Name</label>
	  <div class="control">
	    <input class="input" type="text" name="name" value="${item.Name}" placeholder="Enter Name here">
	  </div>
	</div>

	<div class="field">
	  <label class="label">Contact Number</label>
	  <div class="control has-icons-left has-icons-right">

	    <input class="input is-success" type="text"name="number" value="${item.number}" placeholder="Enter contact Number" >
	    <span class="icon is-small is-left">
	      <i class="fas fa-user"></i>
	    </span>
	  </div>
	</div>

	<div class="field">
	  <label class="label">Email</label>
	  <div class="control has-icons-left has-icons-right">
	    <input class="input is-success" type="email" name="email" value="${item.Email}" placeholder="Email input">
	    <span class="icon is-small is-left">
	      <i class="fas fa-envelope"></i>
	    </span>
	  </div>
	</div>
	<div class="field">
		<label class="label">Image URL</label>
		  <input class="input is-success" type="URL" name="URL" value="${item.URL}"placeholder="Enter URL">
	</div>
	<div class="field">
	  <label class="label" >Category</label>
	  <div class="control">
	    <div class="select">
	      <select name="catagory">
	      	<option> Personal</option>
	        <option>friend</option>
	        <option>family</option>
	        <option>Work</option>
	        <option>Other</option>
	      </select>
	    </div>
	  </div>
	</div>

	<div class="field is-grouped">
	  <div class="control">
	    <button class="button is-link" onclick="saveNewData();" type="submit">Submit</button>
	  </div>
	</div>
	</form>`;
	//alert('changing id', item._id);
	edit.appendChild(editDiv);

}

const saveNewData = () => {       
	const formElem = document.getElementById('contact-form');
	const formData = new FormData(formElem);
	
	var Name = formData.get('name');
	var number = formData.get('number');
	var Email = formData.get('email');
	var Catagory = formData.get('catagory');
	var URL = formData.get('URL');
	
	validate(Name,number,Email,Catagory,URL);     // validate form data

	var  sendData = {
		Name , number, Email,Catagory, URL
	}
	console.log(sendData); 


	console.log('inside go()');
	fetch(API_URL+'/contacts', {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {
        'content-type': 'application/json'
    }
})
.then(response => response.json())
.then(data=> console.log(data));
console.log('after fetch...');
}

const  validate = (name, number, email, catagory, URL) =>{
	if(!name && !number && !email && !catagory && !URL)
	{
		console.log('All fields must be entered');
	}
	else {
		alert("success");
	}	 
}
