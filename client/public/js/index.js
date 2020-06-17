
const formElem = document.getElementById('contact-form');
const errorElem = document.getElementById('error');
const API_URL='http://localhost:3030';

formElem.addEventListener('submit', (event) => {        // Grab the form data and make API req to save to db 
	event.preventDefault();
    const formData = new FormData(formElem);
 	
 	var Name = formData.get('name');
 	var number = formData.get('number');
 	var Email = formData.get('email');
     var Catagory = formData.get('catagory');
     var URL = formData.get('URL');
	
 	validate(Name,number,Email,Catagory,URL);     // Client side form validation 

 	var  sendData = {
 		Name , number, Email,Catagory, URL
 	}
 	console.log(sendData);

 	fetch(API_URL+'/contacts', {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => console.log(response))
        .then(data=> console.log(data));
 });


const  validate = (name, number, email, catagory,URL) =>{
while (errorElem.lastChild) 				
    errorElem.removeChild(errorElem.lastChild);
if(!name && !number && !email && !catagory)
{
    CreateMessageDiv("Do not leave fields empty");
}
else {
    
    CreateMessageDiv("Success");	
}	 
}

const CreateMessageDiv = (message)=>{
   const div = document.createElement('div');
   const header = document.createElement('h3');

   header.textContent = message;
   div.appendChild(header);
   errorElem.appendChild(div);
}

 