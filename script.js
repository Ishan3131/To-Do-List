window.onload = load();

document.addEventListener("click", (v)=>{

  //   tab 
   if(v.target.classList=="tab"){    document.getElementsByClassName("tab select")[0].classList.remove("select");
    v.target.classList.add("select");
        document.getElementsByClassName("tab_select")[0].classList.add("tab_unselect")
    document.getElementsByClassName("tab_select")[0].classList.remove("tab_select")
 let elem = document.getElementById(v.target.innerHTML);
 elem.classList.add("tab_select");
 elem.classList.remove("tab_unselect")
} 

  //    add task
 if(v.target.id=="pls" || v.target.id == "add"){ 
   
document.getElementById("task_form").classList.remove("dis_form")   
document.getElementById("task_form").style.display="block";
document.getElementById("task_form").classList.add("apr_form")
document.getElementById("enter_tsk").value="";
document.getElementById("enter_due").value="";   
   
 }
//      form_cancle
  if(v.target.id=="cnl_btn"){  

  document.getElementById("task_form").classList.remove("apr_form")
  document.getElementById("task_form").classList.add("dis_form")
  setTimeout(() => {
  document.getElementById("task_form").style.display="none";
  document.getElementById("task_form").classList.remove("dis_form");
  }, 400)
    
}
  
//    form_add                       
if(v.target.id=="add_btn"){
  let tsk = document.getElementById("enter_tsk").value;

  let due = document.getElementById("enter_due").value;
  due = due.split("-");

  let dy = new Date();
  
if(tsk.length <= 60){
 tsk = tsk.trim();
  if(tsk.length>0){
  if(due[0]>dy.getFullYear(Date)){
    
  add_tsk_pnding(tsk, due);
    
  }

else if(due[0]==dy.getFullYear(Date)){

if(due[1]>dy.getMonth(Date)+1){

add_tsk_pnding(tsk, due);
  
 }

else if(due[1]==dy.getMonth(Date)+1){

 if(due[2]>=dy.getDate(Date)){
   add_tsk_pnding(tsk, due)
 }
  else{
    document.getElementById('enter_due').style.borderBottom="3px solid red";

   setTimeout(()=>{
     document.getElementById('enter_due').style.borderBottom="3px solid cyan";
   }, 2000)
  }
  
}

  else{    document.getElementById('enter_due').style.borderBottom="3px solid red";

   setTimeout(()=>{
     document.getElementById('enter_due').style.borderBottom="3px solid cyan";
   }, 2000)
  }
    
  }
  else{    document.getElementById('enter_due').style.borderBottom="3px solid red";

   setTimeout(()=>{
     document.getElementById('enter_due').style.borderBottom="3px solid cyan";
   }, 2000)    
  }
}
else{
  document.getElementById('enter_tsk').style.borderBottom="3px solid red";
     

  setTimeout(()=>{
    document.getElementById('enter_tsk').style.borderBottom="3px solid cyan";
     
  }, 2000)
}
}
  else{   
    document.getElementById('enter_tsk').style.borderBottom="3px solid red";
document.getElementById("lmt").style.color="red";

  setTimeout(()=>{
    document.getElementById("enter_tsk").style.borderBottom="3px solid cyan";
document.getElementById("lmt").style.color="#ffffff";
  }, 2000)
  }
}

if(v.target.classList=="task_dn"){
     tk_done(v);
}

  
})  

// removing tasks function
document.addEventListener("dblclick", (v) =>{
   if(v.target.classList == "task_pnd" || v.target.classList == "task_msng" || v.target.classList == "task_dne" || v.target.classList == "task_dne_late"){
     let p_key = v.target.firstElementChild.innerHTML;
     v.target.classList.add("remove_task");
     localStorage.removeItem(`${p_key}`);
     
     setTimeout(() => {
     v.target.innerHTML = "";
     }, 100);
      
     setTimeout(() => {
     v.target.remove(); 
     }, 500);
   }
})

function add_tsk_pnding(tsk, due){ 
  
let day = new Date();
let date = day.getDate(Date);
let month = day.getMonth(Date);
let year = day.getFullYear(Date);
let dte = `${date}/${month+1}/${year}`
let due_dt = `${due[2]}/${due[1]}/${due[0]}`;

  
  let lngt = localStorage.length;
  let lt_k;
  if(lngt>0){
  let obt =  Object.keys(localStorage); 
  lt_k = Math.max(... obt);
  }
  else{
 lt_k = 0;
  }
  
//    creating task element
  if(lt_k+1 != "NaN"){
let tp = document.createElement("div");
tp.classList.add("task_pnd");
tp.innerHTML = `<p class="hd_key">${lt_k+1}</p>
<p class="task_txt">${tsk}</p>
<h class="task_date">${dte}</h>
<h class="due">Due:</h>   
<h class="task_due_date">${due_dt}</h>
<h class="task_dn">Done</h>`

//   appending task element
 let pnd = document.getElementById("Pending");
pnd.prepend(tp); 

 document.getElementById("task_form").classList.remove("apr_form")
 document.getElementById("task_form").classList.add("dis_form")
  setTimeout(() => {
  document.getElementById("task_form").style.display="none";
  document.getElementById("task_form").classList.remove("dis_form");
  }, 400)

//   storing data in storage
  
  let arr = [lt_k+1,"Pending", tsk, due_dt, dte];

  
  localStorage.setItem(`${lt_k+1}`, `${arr}`)
}
}

function load(){

  //  Retrieving data from LS
  
  let arr = [];
  let lgt = localStorage.length;
  if(lgt>0){
  let ky_obt = Object.keys(localStorage);
    let fst_ky = Math.min(... ky_obt);

   let lst_ky = Math.max(... ky_obt);
    
  let ary;  
    
  while(fst_ky<=lst_ky){
    
    let dta = localStorage.getItem(fst_ky);
    if(dta != null){
    dta = dta.split(",")
     ary = Array.from(dta)
    arr.push(ary);
    }
    fst_ky++;  
  }
 
//   filltering array of data

let pndg_msng;
let pndg;
let msng;
let dn;
let dn_lt;
    
//  filtering pending and missing
  pndg_msng = arr.filter((a)=>{
     return a[1] == "Pending";
  })

// filtering missing from arr
    
 msng = arr.filter((m)=>{
   return m[1]=="Missing";
})
// filtering msng and pndg from pndg_msng
    
   pndg = pndg_msng.filter((b)=>{

  //   Current date
  let d_y = new Date();
  let d_t = d_y.getDate(Date);
  let m_t = d_y.getMonth(Date);
  let y_r = d_y.getFullYear(Date);
  let dy = [d_t, m_t+1, y_r];

  //   Due date
  let du = b[3].split("/");
     
  if(du[2]>dy[2]){
    return b;
  }
  else if(du[2]<dy[2]){
     b[1] = "Missing";
    localStorage.setItem(`${b[0]}`, `${b}`)
     msng.push(b);
     }
    else if(du[2]==du[2]){


    
   if(du[1]>dy[1]){
    return b;
  }
  else if(du[1]<dy[1]){
     b[1] = "Missing";
    localStorage.setItem(`${b[0]}`, `${b}`)
     msng.push(b);
    }
     else if(du[1]==dy[1]){  


       
      if(du[0]>=dy[0]){
    return b;
        
  }
  else if(du[0]<dy[0]){
     b[1] = "Missing"
    localStorage.setItem(`${b[0]}`, `${b}`)
     msng.push(b);
    }
   }
  }
})

    

// Restoring completed tasks   
    
   arr.forEach((c)=>{
   if(c[1] == "Done"){
     let dn_t = document.createElement("div");
     dn_t.classList.add("task_dne")
     dn_t.innerHTML =
     `<p class="hd_key">${c[0]}</p>
      <p class="task_txt">${c[2]}</p>
      <h class="task_date">${c[4]}</h>
      <h class="due">Due:</h>   
      <h class="task_due_date">${c[3]}</h>
      <h class="task_done">Completed</h>`
     // prepending task element
     let dn_e = document.getElementById('Done');
     dn_e.prepend(dn_t)
   }
   if(c[1] == "Done late"){
     let dl_t = document.createElement("div");
     dl_t.classList.add("task_dne_late");
     dl_t.innerHTML =
     `<p class="hd_key">${c[0]}</p>
      <p class="task_txt">${c[2]}</p>
      <h class="task_date">${c[4]}</h>
      <h class="due">Due:</h>   
      <h class="task_due_date">${c[3]}</h>
      <h class="task_done_late">Completed late</h>`
     //prepending task element
    let d_ne =  document.getElementById("Done");
    d_ne.prepend(dl_t);
    }
})    

//  Restoring Pending tasks
    
 for(let a = 0;a<pndg.length;a++){
  let p_t = document.createElement("div");
p_t.classList.add("task_pnd");
p_t.innerHTML = 
`<p class="hd_key">${pndg[a][0]}</p>
<p class="task_txt">${pndg[a][2]}</p>
<h class="task_date">${pndg[a][4]}</h>
<h class="due">Due:</h>   
<h class="task_due_date">${pndg[a][3]}</h>
<h class="task_dn">Done</h>`
//   prepending task element
 let pn_d = document.getElementById("Pending");
  pn_d.appendChild(p_t);
}

//  Restoring Missing tasks

  for(let b=0;b<msng.length;b++){
  m_t = document.createElement("div");  m_t.classList.add("task_msng");
m_t.innerHTML =
`<p class="hd_key">${msng[b][0]}</p>
<p class="task_txt">${msng[b][2]}</p>
<h class="task_date">${msng[b][4]}</h>
<h class="due">Due:</h>   
<h class="task_due_date">${msng[b][3]}</h>
<h class="task_dn">Done</h>`
// appending task element
let ms_g = document.getElementById('Missing');
ms_g.appendChild(m_t);
}

  }
  else{}

}

function tk_done(v){

let te = v.target.parentElement;
  
//  accessing primary key
  let h_k = te.firstElementChild.innerHTML;

  te.classList.add("remove_task");

setTimeout(() => {
     te.innerHTML = "";
     }, 100);
      
     setTimeout(() => {
     te.remove(); 
     }, 500);

//  accessing data 
  let a_r = localStorage.getItem(`${h_k}`);
  a_r = a_r.split(",");
  let ar = Array.from(a_r);



  let da = new Date();
  let de = da.getDate(Date);
  let mh = da.getMonth(Date)+1;
  let ye = da.getFullYear(Date);

  let d_u = ar[3];
  let du = d_u.split("/");

  if(du[2]>ye){
    dn(ar, h_k);
  }
  else if(du[2]<ye){
    dl(ar, h_k)
  }
  else if(du[2]==ye){


  if(du[1]>mh){
    dn(ar, h_k)
  }
  else if(du[1]<mh){
    dl(ar, h_k)
  }
  else if(du[1]>=mh){


  if(du[0]>=de){
    dn(ar, h_k)
  }
  else if(du[0]<de){
    dl(ar, h_k)
  }
    
  }

    
  }
  
}

function dn(ar, h_k){

   ar[1]="Done";
  localStorage.setItem(`${h_k}`, `${ar}`)
  
  let dn_t = document.createElement("div");
dn_t.classList.add("task_dne")
dn_t.innerHTML =
`<p class="hd_key">${ar[0]}</p>
<p class="task_txt">${ar[2]}</p>
<h class="task_date">${ar[4]}</h>
<h class="due">Due:</h>   
<h class="task_due_date">${ar[3]}</h>
<h class="task_done">Completed</h>`
// appending task element
let dn_e = document.getElementById('Done');
dn_e.prepend(dn_t);
}



function dl(ar, h_k){

ar[1]="Done late";
  localStorage.setItem(`${h_k}`, `${ar}`)
  
  let dl_t = document.createElement("div");
dl_t.classList.add("task_dne_late")
dl_t.innerHTML =
`<p class="hd_key">${ar[0]}</p>
<p class="task_txt">${ar[2]}</p>
<h class="task_date">${ar[4]}</h>
<h class="due">Due:</h>   
<h class="task_due_date">${ar[3]}</h>
<h class="task_done_late">Completed late</h>`
// appending task element
let dl_e = document.getElementById('Done');
dl_e.prepend(dl_t);
  
}




    function cler(){
      localStorage.clear();
      location.reload();
    }
