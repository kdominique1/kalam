import{ba as d,bh as h,ca as g,bi as y,aI as x,aT as e,bk as N,bf as t,bb as o,ce as v,bd as f,bw as k,bz as S,ct as C,cX as I,bs as M}from"./vendor.9dfca3cc.js";import{a as B}from"./vendor_axios.5abceb0c.js";import{B as l}from"./index.ad695817.js";import"./vendor_core_js_pure.26d1b0db.js";import"./vendor_react_epic_spinners.bbaea7d4.js";import"./vendor_mui_datatables.3afb61c8.js";import"./vendor_lodash.872a697f.js";import"./vendor_react_slick.b9cbcc15.js";import"./vendor_react_easy_edit.1ec3282f.js";import"./vendor_react_player.58c4554f.js";const F="https://join.navgurukul.org/api/",T=d(a=>({container:{display:"flex",flexDirection:"column",alignItems:"center",margin:a.spacing(4)},btn:{marginTop:a.spacing(4)},userContact:{padding:a.spacing(3,2),maxWidth:400,display:"flex",flexDirection:"column",alignItems:"center"},root:{"& > *":{margin:a.spacing(1)}}})),H=()=>{const a=T(),{enqueueSnackbar:s}=h(),c=g(),{loggedInUser:m}=y(r=>r.auth),[i,b]=x.useState(""),p=r=>n=>{n.target.value,b(n.target.value)},u=()=>{const r=i;try{B.post(`${F}students/mobile/${m.id}`,{mobile:r}).then(()=>{s("Mobile number is successfully changed!",{variant:"success"}),c("/students")})}catch{s("Please enter valide mobile number!",{variant:"error"})}};return e(N,{children:e(t,{className:a.container,children:o(v,{className:a.userContact,children:[e(t,{children:e(f,{variant:"h5",component:"h3",children:"Update Mobile Number"})}),e(t,{style:{height:l.spacing(5)}}),e(t,{children:o(k,{children:[e(S,{htmlFor:"partnerName",children:"Mobile Number"}),e(C,{id:"partnerName","aria-describedby":"my-helper-text",name:"mobileNumber",value:i,onChange:p()}),e(I,{id:"my-helper-text",children:"Apna Mobile Number Enter karein."})]})}),e(t,{style:{height:l.spacing(2)}}),e("div",{className:a.root,children:e(M,{variant:"outlined",onClick:u,color:"primary",children:"Submit"})})]})})})};export{H as default};
