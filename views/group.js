window.addEventListener("DOMContentLoaded", () => {
    console.log("Hello")
      showgroup()
  })
  function showgroup(){
    const token = localStorage.getItem("token");
    console.log(token)
    axios.get("http://localhost:3000/getgroups", {headers: { Authorization: token},})
    .then((response) => {
      console.log(response.data);
      console.log(response.data.data)
      let groupdiv = document.getElementById("seegroups");
      let content = "";
      for (let i = 0; i < response.data.data.length; i++) {
        let grpname = response.data.data[i].userId;
        let grpid = response.data.data[i].groupId;
        console.log(grpname,grpid)
        content+=`<p>${grpid}</p><button type="submit" 
          onclick="entergroup(${grpid},${grpname})" class="grpele btn" id="jumpbtn">Enter group</button>`
  
      }
      groupdiv.innerHTML = content;
    })
    .catch((err) => console.log(err));
  }
  
  
  
  
  function entergroup(grpid,grpname) {
      window.location.href=`http://127.0.0.1:5500/views/groupuser.html?${grpname}/${grpid}`
      console.log("inside jump into")
  }
  
  
  
  
  
  
  var creategroup=document.getElementById('creategroup');
  creategroup.addEventListener('click',(e)=>{
    e.preventDefault();
    let token = localStorage.getItem("token");
    let groupname = document.getElementById("groupname").value;
    let obj = {name: groupname};
    axios.post("http://localhost:3000/creategroup", obj, {headers: { Authorization: token }})
      .then((response) => {
        if (response.status == 201) {
          console.log(response);
          showgroup()
          alert(response.data.message);
        } else {
          throw new Error();
        }
      })
      .catch((err) => console.log(err));
  })
  
  
  
  
  
  
  
  
  
  
  
  
  
  var logoutbtn=document.getElementById('logout');
  logoutbtn.addEventListener('click',()=>{
    localStorage.removeItem("token")
    window.location.href="http://127.0.0.1:5500/chatapplication/views/public/user/login.html"
  })