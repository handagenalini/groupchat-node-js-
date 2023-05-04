let btn=document.getElementById('loginbtn');
btn.addEventListener('click',(e)=>{
    e.preventDefault()
    let email=document.getElementById('e2').value
    let password=document.getElementById('pass2').value
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!(email.match(validRegex))) {
        alert("Invalid email address!");
        return false;
    }
    let userdetails={
    email:email,
    password:password,
    };
    axios.post("http://localhost:3000/signin",userdetails)
    .then(response=>{
        console.log(response.data,"List of online users")
        localStorage.setItem('token',response.data.token)
        
        window.location.href="http://127.0.0.1:5500/views/group.html"
    })
    .catch(err=>{
        alert(err.message)
        console.log(err)
    })
})