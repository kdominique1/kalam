import{aI as a,b as s,aT as e,bc as i,b$ as p}from"./vendor.9dfca3cc.js";import{M as u}from"./index.ad695817.js";import"./vendor_core_js_pure.26d1b0db.js";import"./vendor_axios.5abceb0c.js";import"./vendor_react_epic_spinners.bbaea7d4.js";import"./vendor_mui_datatables.3afb61c8.js";import"./vendor_lodash.872a697f.js";import"./vendor_react_slick.b9cbcc15.js";import"./vendor_react_easy_edit.1ec3282f.js";import"./vendor_react_player.58c4554f.js";const m=[{id:1,partnerGroup:"AKANSHA"}],c=[{name:"id",label:"S.No",options:{filter:!0,sort:!0,customBodyRender:(r,t)=>t.rowIndex+1}},{name:"partnerGroup",label:"Name",options:{filter:!0,sort:!0,customBodyRender:(r,t)=>{const n=`/partner/group/${t.rowData[0]}`;return e(p,{target:"_blank",to:n,style:{color:"#f05f40"},children:r})}}}],g=()=>{const[r,t]=a.useState([]),[o]=a.useState(!1);return s.exports.useEffect(()=>t(m),[]),e(i,{maxWidth:"sm",children:e(u,{title:"Partner Groups",columns:c,data:r,showLoader:o})})};export{g as default};
