// بيانات تجريبية قابلة للتعديل. راجع الأسعار والتكلفة قبل نشر المتجر.
const WHATSAPP_NUMBER = "201064836718";
const catalog = {
account: {
title: "شحن على الأكونت",
products: [
{id:"a100",name:"100 جوهرة",price:50,desc:"شحن مباشر على الأكونت",icon:"💎"},
{id:"a310",name:"310 جوهرة",price:175,desc:"شحن مباشر على الأكونت",icon:"💎"},
{id:"a520",name:"520 جوهرة",price:290,desc:"شحن مباشر على الأكونت",icon:"💎"},
{id:"a1060",name:"1060 جوهرة",price:570,desc:"شحن مباشر على الأكونت",icon:"💎"},
{id:"a2180",name:"2180 جوهرة",price:1100,desc:"شحن مباشر على الأكونت",icon:"💎"},
{id:"a5600",name:"5600 جوهرة",price:1900,desc:"شحن مباشر على الأكونت",icon:"💎"},
    {id:"weekly-account",name:"عضوية أسبوعية على الأكونت",price:90,desc:"450 جوهرة — أسبوعياً",icon:"👑"},
    {id:"monthly-account",name:"عضوية شهرية على الأكونت",price:380,desc:"2600 جوهرة — شهرياً",icon:"👑"}
]
},
id: {
title: "شحن بالـ ID",
products: [
{id:"i100",name:"100 جوهرة",price:60,desc:"شحن عن طريق ID اللاعب | $1.15",icon:"💎"},
{id:"i210",name:"210 جوهرة",price:120,desc:"شحن عن طريق ID اللاعب | $2.30",icon:"💎"},
{id:"i310",name:"310 جوهرة",price:175,desc:"شحن عن طريق ID اللاعب | $3.36",icon:"💎"},
{id:"i520",name:"520 جوهرة",price:290,desc:"شحن عن طريق ID اللاعب | $5.57",icon:"💎"},
{id:"i1060",name:"1060 جوهرة",price:570,desc:"شحن عن طريق ID اللاعب | $10.94",icon:"💎"},
{id:"i2200",name:"2200 جوهرة",price:1100,desc:"شحن عن طريق ID اللاعب | $21.11",icon:"💎"}
]
},
memberships: {
title: "العضويات والبطاقات",
products: [
{id:"weekly",name:"عضوية أسبوعية",price:125,desc:"450 جوهرة — أسبوعي | $2.40",icon:"🟢"},
{id:"monthly",name:"عضوية شهرية",price:580,desc:"2600 جوهرة — شهري | $11.13",icon:"🟣"},
{id:"level",name:"عضوية مستوى",price:220,desc:"تأكد من التوفر قبل الدفع",icon:"🎟️"},
{id:"booyah",name:"Booyah Pass",price:180,desc:"تأكد من التوفر والسعر | $3.45",icon:"🔥"}
]
},
accounts: {
title: "حسابات للبيع",
products: [
{id:"acc-contact",name:"حسابات متاحة",price:null,desc:"ابعتلنا ميزانيتك والمواصفات المطلوبة",icon:"🎮"},
{id:"acc-sell",name:"عايز تبيع حسابك؟",price:null,desc:"التقييم بعد مراجعة تفاصيل الحساب",icon:"🔎"}
]
},
offers: {
title: "العروض والخصومات",
products: [
{id:"offer-current",name:"اسأل عن عروض اليوم",price:null,desc:"العروض والأسعار بتتغير حسب التوفر",icon:"🔥"},
{id:"offer-bundle",name:"عرض خاص",price:null,desc:"ابعت الباقة اللي محتاجها ونراجع السعر",icon:"🎁"}
]
},
pricing: {
title: "الأسعار والعروض",
products: [
{id:"membership",name:"👑 أسعار العضويات",price:null,desc:"🗓️ أسبوعي (450💎) بـ 90 جـ<br>📅 شهري (2600💎) بـ 385 جـ",icon:"👑"},
{id:"gems",name:"💎 أسعار الجواهر",price:null,desc:"💎 100 جوهرة بـ 50 جـ<br>💎 310 جوهرة بـ 150 جـ<br>💎 520 جوهرة بـ 230 جـ<br>💎 1060 جوهرة بـ 385 جـ<br>💎 2180 جوهرة بـ 770 جـ<br>💎 5600 جوهرة بـ 1900 جـ",icon:"💎"},
{id:"diamonds",name:"🎁 أسعار الدروبات",price:null,desc:"🎁 دروب 16.99 بـ 40 جـ<br>🎁 دروب 49.99 (1$) بـ 55 جـ<br>🎁 دروب 99.99 (2$) بـ 100 جـ",icon:"🎁"}
]
}
};
let activeCategory = "account";
let selectedProduct = null;
const $ = (s) => document.querySelector(s);
const productsEl = $("#products");
const money = (price) => price == null ? "حسب الاتفاق" : `${price} <small>ج.م</small>`;
// بيانات حسابات الدفع
const paymentInfo = {
  "Vodafone Cash": {
    name: "فودافون كاش",
    number: "اكتب رقم فودافون كاش هنا"
  },
  "InstaPay": {
    name: "إنستا باي",
    number: "اكتب عنوان إنستا باي هنا"
  }
};

// تحديث بيانات الدفع عند اختيار طريقة الدفع
document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener("change", function() {
    const selectedMethod = paymentInfo[this.value];
    if (selectedMethod) {
      document.querySelector(".payment-method:nth-child(1) .method-name").textContent = selectedMethod.name;
      document.querySelector(".payment-method:nth-child(1) .method-number").textContent = selectedMethod.number;
      document.querySelector(".payment-method:nth-child(2)").style.display = "none";
    }
  });
});

// عرض اسم الملف عند اختيار صورة الإيصال
$("#receipt").addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    $("#file-name").textContent = "الصورة المختارة: " + file.name;
  } else {
    $("#file-name").textContent = "لم يتم اختيار صورة";
  }
});
function renderProducts(category) {
activeCategory = category;
const group = catalog[category];
$("#productHeading").textContent = group.title;
document.querySelectorAll(".category-card").forEach(btn => btn.classList.toggle("active", btn.dataset.category === category));
productsEl.innerHTML = "";
group.products.forEach(product => {
const card = document.createElement("article");
card.className = "product-card" + (selectedProduct?.id === product.id ? " selected" : "");
const icon = document.createElement("div"); icon.className = "product-icon"; icon.textContent = product.icon;
const title = document.createElement("h3"); title.textContent = product.name;
const desc = document.createElement("p"); 
        // عرض عدد الجواهر إذا كان موجوداً
        let gemsText = "";
        if (product.name.includes("جوهرة")) {
            // استخراج عدد الجواهر من اسم المنتج
            const gemsMatch = product.name.match(/(\d+)\s*جوهرة/);
            if (gemsMatch) {
                gemsText = `💎 ${gemsMatch[1]} جوهرة`;
            }
        }
        desc.innerHTML = `${product.desc}${gemsText ? "<br>" + gemsText : ""}`;
const bottom = document.createElement("div"); bottom.className = "product-bottom";
const price = document.createElement("div"); price.className = "price"; price.innerHTML = money(product.price);
const choose = document.createElement("button"); choose.type = "button"; choose.className = "choose-btn"; choose.textContent = selectedProduct?.id === product.id ? "تم الاختيار ✓" : "اختار";
choose.addEventListener("click", () => {
selectedProduct = {...product, category: group.title};
$("#selectedName").textContent = product.name;
$("#selectedPrice").textContent = product.price == null ? "حسب الاتفاق" : `${product.price} ج.م`;
renderProducts(activeCategory);
$("#order").scrollIntoView({behavior:"smooth",block:"start"});
});
bottom.append(price, choose); card.append(icon,title,desc,bottom); productsEl.append(card);
});
}
document.querySelectorAll(".category-card").forEach(btn => btn.addEventListener("click", () => renderProducts(btn.dataset.category)));
$("#orderForm").addEventListener("submit", (event) => {
event.preventDefault();
if (!selectedProduct) { alert("اختار الباقة أو الخدمة الأول."); return; }
const playerId = $("#playerId").value.trim();
if (["account","id","memberships"].includes(activeCategory) && !playerId) {
alert("اكتب ID اللاعب. لو اخترت خدمة لا تحتاج ID، اكتب (غير مطلوب) في خانة الملاحظات."); $("#playerId").focus(); return;
}
const payment = document.querySelector('input[name="payment"]:checked')?.value || "غير محدد";
const playerName = $("#playerName").value.trim() || "غير مذكور";
const notes = $("#notes").value.trim() || "لا توجد";
const receiptFile = $("#receipt")[0].files[0];

const priceText = selectedProduct.price == null ? "يُحدد بعد التواصل" : `${selectedProduct.price} جنيه مصري`;

// الحصول على بيانات الدفع
const paymentMethod = paymentInfo[payment] || {name: payment, number: "غير محدد"};

// إنشاء الرسالة الأساسية
const message = [
"السلام عليكم، عايز أطلب من KEVIN GAME STORE 🎮",
`القسم: ${selectedProduct.category}`,
`الخدمة: ${selectedProduct.name}`,
`السعر الظاهر: ${priceText}`,
`Player ID: ${playerId || "غير مطلوب"}`,
`اسم اللاعب: ${playerName}`,
`طريقة الدفع: ${paymentMethod.name}`,
`رقم الحساب: ${paymentMethod.number}`,
`ملاحظات: ${notes}`,
"",
"عارف إن الطلب غير مؤكد إلا بعد مراجعة الدفع وتأكيد المتجر."
"يرجى رفع صورة الإيصال بعد التحويل."
"شكراً لثقتكم بـ KEVIN GAME STORE 🎮"
].join("\n");

// إذا كان هناك صورة للإيصال
if (receiptFile) {
  // إنشاء رابط مؤقت للصورة
  const reader = new FileReader();
  reader.onload = function(e) {
    const imageData = e.target.result;
    const base64Data = imageData.split(",")[1];
    
    // إنشاء رابط واتساب مع الصورة
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener");
    
    // إظهار رسالة تأكيد
    alert("تم إرسال الطلب بنجاح. الصورة ستتم مراجعتها قريباً.");
  };
  reader.readAsDataURL(receiptFile);
} else {
  // إذا لم يكن هناك صورة، إرسال الرسالة فقط
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  alert("تم إرسال الطلب بنجاح. الصورة الإلزامية لم يتم رفعها.");
}
});
$("#year").textContent = new Date().getFullYear();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
let installPrompt;
window.addEventListener("beforeinstallprompt", (event) => {
event.preventDefault(); installPrompt = event; $("#installBtn").classList.remove("hidden");
});
$("#installBtn").addEventListener("click", async () => {
if (!installPrompt) return;
installPrompt.prompt();
await installPrompt.userChoice;
installPrompt = null; $("#installBtn").classList.add("hidden");
});
// زر تشغيل كل الأزرار
const runAllBtn = document.getElementById("runAllBtn");
if (runAllBtn) {
    runAllBtn.addEventListener("click", () => {
        // اختار أول منتج في قسم شحن على الأكونت (جواهر)
        const accountProducts = catalog.account.products;
        if (accountProducts.length > 0) {
            // اختيار أول منتج في قسم الجواهر
            const gemsProduct = accountProducts[0];
            selectedProduct = {...gemsProduct, category: catalog.account.title};
            $("#selectedName").textContent = gemsProduct.name;
            $("#selectedPrice").textContent = gemsProduct.price == null ? "حسب الاتفاق" : `${gemsProduct.price} ج.م`;
            
            // الانتقال إلى قسم الطلب
            $("#order").scrollIntoView({behavior:"smooth",block:"start"});
            
            // إظهار رسالة تأكيد
            alert(`تم اختيار: ${gemsProduct.name} - ${gemsProduct.desc}\nالسعر: ${gemsProduct.price == null ? "حسب الاتفاق" : `${gemsProduct.price} ج.م`}`);
            
            // التمرير تلقائيًا لعرض قسم الجواهر والأسعار
            setTimeout(() => {
                document.querySelector('.category-card[data-category="account"]')?.click();
                // الانتقال لأسفل لعرض المنتجات
                setTimeout(() => {
                    window.scrollTo({top: document.querySelector('.products-section').offsetTop - 100, behavior: 'smooth'});
                }, 300);
            }, 500);
        }
    });
}

renderProducts("account");