let btn=document.getElementById('signupbtn');
btn.addEventListener('click',(e)=>{
    e.preventDefault()
    let email=document.getElementById('e1').value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!(email.match(validRegex))) {
        alert("Invalid email address!");
        return false;
    }
    let userdetails={
    name:document.getElementById('n1').value,
    email:email,
    phonenumber:document.getElementById("ph1").value,
    password:document.getElementById('pass1').value,
    };
    console.log(userdetails)
    axios.post("http://localhost:3000/signup",userdetails)
    .then(response=>{
        console.log(response);
        alert("Sign Up Done")
        window.location = "./login.html";
    })
    .catch(err=>alert("user Already Exist Please Login"))
})