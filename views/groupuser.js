window.addEventListener("DOMContentLoaded", () => {
    
    console.log("Hello")
    console.log(window.location.href)

    var x=window.location.href[window.location.href.length-1]
    console.log("x is",x)
    
    var y=window.location.href[window.location.href.length-3];
    console.log("y is",y)
    
    var groupid=x
    console.log(groupid)

    
    var groupname=document.getElementById('groupchat');
    groupname.innerHTML=`Welcome to Group ${groupid}`
    
    getmembers(groupid)
    getchat(groupid)
    
})





async function getmembers(groupid) {

    let token = localStorage.getItem("token");
    console.log(token)
    console.log("inside get members")
    var check=0

    try{
        var memberlist;
        var response=await axios
        .get(`http://localhost:3000/getgroupmembers/${groupid}`, 
        {headers: { Authorization: token }})

        console.log(response.data,"this is member listresponse1")
        memberlist=response.data.data;
        

        for(let i=0;i<memberlist.length;i++){
            if(memberlist[i].userId==response.data.myuser.id &&
                memberlist[i].isadmin==true){
                console.log("Admin found looged user is admin")
                check=1;
                break;
            }
        }
        if(check==0){
            console.log("Loggedd in user is not admin")
        }

    }catch(err){
        console.log(err)
    }

    if(check==0){
        normaluser(memberlist)
    }
    else{
        adminuser(memberlist,groupid)
    }
    
    
}
function normaluser(data){
    var content=`<h3>List of users in this Group</h3>`;
    var userlist=document.getElementById('userlist');
    console.log("Inside Normal User")
    for(let i=0;i<data.length;i++){
        console.log(data[i],"DATA")
        content+=`<p>${data[i].user.name}</p>`
    }
    console.log(content)
    userlist.innerHTML=content
}
function adminuser(data,groupid){
    var content=`<h3>List of users in this Group</h3>`;
    var adminfunctions=document.getElementById('admin');
    

    for(let i=0;i<data.length;i++){
        console.log(data[i],"DATA",groupid,data[i].userId)
        content+=`<p>${data[i].user.name}</p>
        <button type="submit" onclick="makeadmin(${groupid},${data[i].userId})" id="${data[i].userId}">Make Him/Her Admin</button>
        <button type="submit" onclick="removeadmin(${groupid},${data[i].userId})" id="${data[i].userId}">Remove Him/Her From Admin</button>
        <button type="submit" onclick="removeuser(${groupid},${data[i].userId})"id="${data[i].userId}">Remove user from group</button>`

    }
    console.log(content)
    adminfunctions.innerHTML=content
    var adduser=document.getElementById('adduser');
    var content=`<h3>Add User</h3><br></br><label>Name:</label><input id="name" type="text">
                <label>UserId:</label><input type="number" id="userid">
                <button type="submit" onclick="adduser(${groupid})">Add User</button>`
    adduser.innerHTML=content


    //console.log("Inside adminuser functions",data,groupid);
}






async function adduser(groupid){
    var userid=document.getElementById('userid').value;
    //var name=document.getElementById('name').value
    console.log("Inside adduser  userid is",userid)


    var token=localStorage.getItem("token")
    
    var obj={
        userid:userid
    }
    console.log(obj)

    try{
        var response=await axios
        .post(`http://localhost:3000/adduser/${groupid}`,
         obj,
         { headers: {Authorization: token} });
         console.log(response)
         alert('User added to Group')



    }
    catch(err){
        console.log(err)
    }

}



































async function getchat(groupid){
    var token=localStorage.getItem("token")
    var response=await axios
    .get(`http://localhost:3000/getmessage/${groupid}`, 
    { headers: {Authorization: token} });
    
    console.log(response,"This is response model user required true")
    var chats=response.data.data
    
    var allchat=document.getElementById('allchat')
    var content='';

    for(let i=0;i<chats.length;i++){
        content+=`<p>${chats[i].user.name}------ ${chats[i].message}</p>`
        console.log(content)

    }

    content+=`<div><label>Enter your message: </label>
    <input type="text" id="message"><button onclick="sendchat(${groupid})" id="sendbtn">Send</button>
    </div>`;
    allchat.innerHTML=content

}







async function sendchat(groupid){
    var message=document.getElementById('message').value
    var token=localStorage.getItem("token")
    
    var obj={
        message:message
    }

    try{
        await axios.post(`http://localhost:3000/postmessage/${groupid}`,
         obj,
         { headers: {Authorization: token} });
        
         getchat(groupid)

    }
    catch(err){
        console.log(err)
    }
}

















async function makeadmin(groupid,userid){
    
    var token=localStorage.getItem("token")
    console.log("Inside make admin")
    console.log(userid,groupid,"this is grup id and user id")
    var obj={userid:userid}
    try{
        var response=await axios.post(`http://localhost:3000/makeadmin/${groupid}`,
        obj,
        { headers: {Authorization: token} });
        console.log(response)
        alert("admin done")
    }
    catch(err){
        console.log(err)
    }



}
async function removeadmin(groupid,userid){
    
    var token=localStorage.getItem("token")
    var obj={userid:userid}
    try{
    var response=await axios.post(`http://localhost:3000/removeadmin/${groupid}`,
    obj,
    { headers: {Authorization: token} });
    console.log(response)
    alert("removed feom admon")
    }
    catch(err){
        console.log(err)
    }
    console.log("Inside remove admin")

}

async function removeuser(groupid,userid){
    
    var token=localStorage.getItem("token")
    var obj={userid:userid}
    try{
    var response=await axios.post(`http://localhost:3000/removeuser/${groupid}`,
    obj,
    { headers: {Authorization: token} });
    console.log(response)
    }
    catch(err){
        console.log(err)
    }
    console.log("Inside remove user")

}