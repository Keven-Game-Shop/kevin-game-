import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, orderBy, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";
import { firebaseConfig } from "./firebase-config.js";
const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app), storage=getStorage(app);
const loginCard=document.querySelector("#loginCard"), dashboard=document.querySelector("#dashboard"), loginMsg=document.querySelector("#loginMsg"), ordersEl=document.querySelector("#orders"), dashMsg=document.querySelector("#dashMsg");
const statusLabels={pending_review:"بانتظار مراجعة الدفع",payment_confirmed:"تم تأكيد الدفع",processing:"جاري الشحن",completed:"مكتمل",rejected:"مرفوض"};
document.querySelector("#loginForm").addEventListener("submit",async e=>{e.preventDefault();loginMsg.textContent="";try{await signInWithEmailAndPassword(auth,document.querySelector("#email").value.trim(),document.querySelector("#password").value)}catch(err){loginMsg.textContent="تعذر تسجيل الدخول. تأكد من بياناتك وأن إيميلك مضاف كأدمن في قواعد الأمان.";console.error(err)}});
onAuthStateChanged(auth,user=>{if(user){loginCard.classList.add("hidden");dashboard.classList.remove("hidden");document.querySelector("#who").textContent=`تم تسجيل الدخول: ${user.email}`;loadOrders()}else{dashboard.classList.add("hidden");loginCard.classList.remove("hidden")}});
document.querySelector("#logoutBtn").addEventListener("click",()=>signOut(auth));
document.querySelector("#refreshBtn").addEventListener("click",loadOrders);
function el(tag,cls,text){const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x}
async function loadOrders(){ordersEl.replaceChildren();dashMsg.textContent="جاري تحميل الطلبات...";try{
const snap=await getDocs(query(collection(db,"orders"),orderBy("createdAt","desc")));
if(snap.empty){dashMsg.textContent="لا توجد طلبات حتى الآن.";return}
dashMsg.textContent=`عدد الطلبات: ${snap.size}`;
for(const d of snap.docs){const o=d.data(), box=el("article","order"), title=el("h3","",`${o.orderNumber||d.id} — ${o.packageLabel||""} — ${o.amount||0} جنيه`);
box.append(title);
const info=el("p","",`الاسم: ${o.playerName||"-"} | ID: ${o.playerId||"-"} | واتساب: ${o.contact||"-"}`);box.append(info);
box.append(el("p","",`الخدمة: ${o.service||"-"} | الدفع: ${o.paymentMethod||"-"} | الملاحظات: ${o.notes||"-"}`));
box.append(el("p","status",`الحالة الحالية: ${statusLabels[o.status]||o.status||"غير محددة"}`));
const proof=el("a","proof","فتح صورة التحويل");proof.href="#";proof.addEventListener("click",async ev=>{ev.preventDefault();try{const url=await getDownloadURL(ref(storage,o.proofPath||`proofs/${o.orderNumber}/receipt`));window.open(url,"_blank","noopener")}catch(e){dashMsg.textContent="تعذر فتح الصورة. تأكد من مسار الصورة وقواعد Storage.";console.error(e)}});box.append(proof);
const controls=el("div","row"), sel=el("select");Object.entries(statusLabels).forEach(([v,l])=>{const op=el("option","",l);op.value=v;op.selected=v===(o.status||"pending_review");sel.append(op)});
const save=el("button","","حفظ الحالة");save.addEventListener("click",async()=>{save.disabled=true;try{await updateDoc(doc(db,"orders",d.id),{status:sel.value,updatedAt:new Date()});dashMsg.textContent=`تم تحديث حالة الطلب ${o.orderNumber||d.id}`;await loadOrders()}catch(e){dashMsg.textContent="فشل تحديث الحالة؛ تحقق من صلاحيات الأدمن.";console.error(e)}finally{save.disabled=false}});
controls.append(sel,save);box.append(controls);ordersEl.append(box)
}
}catch(e){dashMsg.textContent="فشل تحميل الطلبات. تأكد من تسجيل الدخول وقواعد Firestore.";console.error(e)}}
