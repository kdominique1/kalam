import{bh as j,bH as A,aI as h,b as R,aT as e,bc as F,bb as r,bk as W,bd as s,bf as w,co as L,dd as N,de as z,cb as i,bt as E,bv as B,bs as k}from"./vendor.9dfca3cc.js";import{a as u}from"./vendor_axios.5abceb0c.js";import{b as q,L as G}from"./index.ad695817.js";import"./vendor_core_js_pure.26d1b0db.js";import"./vendor_react_epic_spinners.bbaea7d4.js";import"./vendor_mui_datatables.3afb61c8.js";import"./vendor_lodash.872a697f.js";import"./vendor_react_slick.b9cbcc15.js";import"./vendor_react_easy_edit.1ec3282f.js";import"./vendor_react_player.58c4554f.js";const f="https://join.navgurukul.org/api/",nt=()=>{const{enqueueSnackbar:d}=j(),{studentId:v}=A(),x=[{id:1,from:"9:00",to:"10:00"},{id:2,from:"10:00",to:"11:00"},{id:3,from:"11:00",to:"12:00"},{id:7,from:"12:00",to:"13:00"},{id:4,from:"13:00",to:"14:00"},{id:5,from:"14:00",to:"15:00"},{id:6,from:"15:00",to:"16:00"}],[C,Y]=h.useState(!0),[o,g]=h.useState({from:"",to:"",id:null,is_cancelled:!0}),[c,I]=h.useState(new Date),[m,M]=h.useState({}),[S,D]=h.useState(x),T=15,y=t=>{const n=i(t),a=n.format("YYYY-MM-DD");I(a),u.get(`${f}/slot/interview/check/ondate/${a}/1`).then(({data:l})=>{if(l.data.length){const b=i().isSame(n,"day")?l.data.filter(p=>p.availiblity&&i().isBefore(i(p.from,"HH:MM"),"hour")):l.data.filter(p=>p.availiblity);D(b)}else D(x)})},_=async()=>{var n,a;return(a=(n=(await u.get(`${f}slot/interview/${v}`)).data)==null?void 0:n.data[0])!=null?a:null},H=async()=>{var n,a;const t=await u.get(`${f}/students/${v}`);return(a=(n=t==null?void 0:t.data)==null?void 0:n.data[0])!=null?a:null};R.exports.useEffect(()=>{(async()=>{const t=await _();t&&g(t);const n=await H();if(n){const{name:a,stage:l,lastTransition:b}=n||{name:null,stage:null,lastTransition:{id:null}};M({name:a,stage:q[l],transitionID:b.id}),y(c),Y(!1)}})()},[]);const $=()=>{u.delete(`${f}slot/interview/stundet/${o.id}`).then(({data:t})=>{t.message==="Successfully inserted slot deleted"?(d("Slot Cancelled",{variant:"info"}),y(c),g({is_cancelled:!0})):d("Slot Not Cancelled",{variant:"error"})})},P=()=>{const{from:t,to:n}=o;u.post(`${f}slot/interview/student`,{student_id:v,student_name:m.name,topic_name:m.stage,transition_id:m.transitionID,start_time:t,end_time_expected:n,duration:"1hr",on_date:c}).then(({data:a})=>{a.status==="successfully_scheduled"?_().then(l=>{l&&g(l),d("Slot Booked",{variant:"success"})}).catch(()=>d("Cannot Book Slot",{variant:"error"})):d("Cannot Book Slot",{variant:"error"})}).catch(()=>{d("Couldn't Book Slot!",{variant:"error"})})};return C?e(G,{}):["English Interview Pending (2nd Round)","Culture Fit Interview Pending (4th Round)","Pending Culture Fit Re-Interview"].includes(m.stage)?e(F,{maxWidth:"md",sx:{bgcolor:"background.paper  ",p:4},children:o.is_cancelled?r(W,{children:[e(s,{variant:"h5",fontWeight:"medium",children:"Book Interview Slot"}),r(s,{variant:"h6",sx:{mt:2},children:["Book Interview Slot ",m.name]}),r(w,{sx:{display:"flex",flexDirection:"column",alignItems:"center",mb:"1.2rem"},children:[e(L,{dateAdapter:N,children:e(z,{displayStaticWrapperAs:"desktop",margin:"normal",id:"date-picker-dialog",format:"yyyy-MM-dd",value:c,onChange:t=>{y(t)},shouldDisableDate:t=>i(t).isAfter(i().set("date",i().get("date")+T)),disablePast:!0,inputVariant:"outlined",fullWidth:!0,KeyboardButtonProps:{"aria-label":"change date"},renderInput:t=>e(E,{...t})})}),S.length>0?e(B,{container:!0,justifyContent:"center",spacing:2,children:S.map(({id:t,from:n,to:a})=>e(B,{item:!0,sm:6,md:4,children:r(k,{color:"primary",fullWidth:!0,variant:o.id===t?"contained":"outlined",sx:{padding:"8px",fontSize:"14px",fontWeight:o.id!==t&&"600",border:o.id!==t&&"2px solid"},onClick:()=>g({id:t,from:n,to:a,is_cancelled:!0}),children:[i(n,"HH").format("h:mm a")," -"," ",i(a,"HH").format("h:mm a")]})},t))}):r(s,{variant:"h6",textAlign:"center",children:["No Slots Available on ",i(c).format("MMM D, YYYY")]})]}),e(k,{variant:"contained",color:"primary",disabled:S.length===0||!o.id,onClick:()=>P(),children:"Book Slot"})]}):r(W,{children:[e(s,{variant:"h4",fontWeight:"medium",children:"Interview Slot Booked"}),e(s,{variant:"h5",fontWeight:"medium",sx:{mt:2},children:"Slot Details"}),r(s,{variant:"h6",sx:{mt:1},fontWeight:"normal",children:[e("span",{style:{fontWeight:"500"},children:"Student Name:"})," ",o.student_name]}),r(s,{variant:"h6",fontWeight:"normal",children:[e("span",{style:{fontWeight:"500"},children:"Topic:"})," ",o.topic_name]}),r(s,{variant:"h6",fontWeight:"normal",children:[e("span",{style:{fontWeight:"500"},children:"On:"})," ",i(o.on_date).format("D MMM YYYY")||""]}),r(s,{variant:"h6",fontWeight:"normal",children:[e("span",{style:{fontWeight:"500"},children:"From"})," ",i(o.start_time,"HH").format("h:mm a")," ",e("span",{style:{fontWeight:"500"},children:"To"})," ",i(o.end_time_expected,"HH").format("h:mm a")]}),e(k,{variant:"contained",color:"primary",sx:{mt:3},onClick:()=>$(),children:"Delete Slot"})]})}):e(w,{style:{display:"flex",justifyContent:"center"},children:e(s,{color:"primary",variant:"h2",style:{marginTop:"0.4rem"},children:"You cannot book slot"})})};export{nt as default};
