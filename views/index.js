// async function signup(e){
//     console.log('-------------------------------in signup')
//     e.preventDefault()
//     const name=e.target.name.value
//     const email=e.target.email.value
//     const phonenumber=e.target.phonenumber.value
//     const password=e.target.password.value
//      const obj={
//         name:name,
//         email:email,
//         phonenumber:phonenumber,
//         password:password
//      }
//      const data= await axios.post(`http://localhost:3000/add`,obj)
//     try{
//     console.log(data)
//     if(data.status===201){
//         alert('signup done')
//     window.location.href = "./login.html"
//     }else{
//         throw new Error('Failed to login')
        
//     } 
// }
// catch(err){
//     document.body.innerHTML += `<div style="color:red;">${err} <div>`;


// }



// }

async function signup(e){
    e.preventDefault()
    console.log('-------------in signup')
    const name=e.target.name.value
    const email=e.target.email.value
    const phonenumber=e.target.phonenumber.value

    const password=e.target.password.value
    const obj={
        name:name,
        email:email,
        phonenumber:phonenumber,

        password:password
    }
 
    const data= await axios.post(`http://localhost:3000/add`,obj).then(response=>{
    console.log('-----------------in add')


        console.log('this is script axios');
        console.log(response)
        // if(response.status===500){
        
        //     document.body.innerHTML += `<div style="color:red;">${response.data.err} user alredy exist <div>`;

        // }
        if(response.status === 201){
            alert('signup done')
            
            window.location.href = "./login.html" // change the page on successful login
        } else {
            throw new Error('Failed to login')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })

}