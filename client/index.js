
const formElem = document.getElementById('contact-form');
const errorElem = document.getElementById('error');
const API_URL='API_URL_GOES_HERE';


formElem.addEventListener('submit', (event) => {        // Grab the form data and make API req to save to db 
    event.preventDefault();

    const formData = new FormData(formElem);
 	
 	var Name = formData.get('name');
 	var number = formData.get('number');
 	var Email = formData.get('email');
 	var Catagory = formData.get('catagory');

 	validate(Name,number,Email,Catagory);     // Client side form validation 

 	var  sendData = {
 		Name , number, Email,Catagory
 	}
 	console.log(sendData);


 	fetch(API_URL+'/contacts/Add', {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => console.log(response))
        .then(data=> console.log(data));
 });

const  validate = (name, number, email, catagory) =>{
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


 