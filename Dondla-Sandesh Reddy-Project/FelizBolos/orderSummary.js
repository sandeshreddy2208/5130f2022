var firebaseConfig = {
    apiKey: "AIzaSyCP4e6Sdj1dPgfWSRgsCkS0rjz0aF1b2aU",
    authDomain: "cakeorder-87fe1.firebaseapp.com",
    databaseURL: "https://cakeorder-87fe1-default-rtdb.firebaseio.com",
    projectId: "cakeorder-87fe1",
    storageBucket: "cakeorder-87fe1.appspot.com",
    messagingSenderId: "803019925549",
    appId: "1:803019925549:web:444a5309f0fe4bfc6370a4"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
const storage = firebase.storage();
const db = firebase.firestore();
var orderNo;

const colRef = db.collection("orders");

var url = window.location.href.split("#");
orderNo = url[1];

colRef.get().then((snapshot) => {
    let orders = [];
    let orderDetails = {};
    snapshot.docs.forEach(doc => {
        orders.push({ ...doc.data(), id: doc.id })
    });
    orders.forEach(function (order) {
        if (order.id == orderNo) {
            orderDetails = order;
        }
    })
    var dateFormat= new Date(orderDetails.timestamp);
    var timestamp= "Date: "+ dateFormat.getDate()+
           "/"+(dateFormat.getMonth()+1)+
           "/"+dateFormat.getFullYear()+
           " "+dateFormat.getHours()+
           ":"+dateFormat.getMinutes()+
           ":"+dateFormat.getSeconds();
    document.getElementById("orderNo").innerHTML = "Order No. " + orderDetails.id;
    document.getElementById("customerName").innerHTML = orderDetails.name;
    document.getElementById("customerName1").innerHTML = "Name: " + orderDetails.name;
    document.getElementById("customerZipcode").innerHTML = "Zip Code: " + orderDetails.zipcode;
    document.getElementById("customerImage").innerHTML = "Image Url: " + orderDetails.image;
    document.getElementById("customerTimestamp").innerHTML = "Timestamp: " + timestamp;
    document.getElementById("customerBaker").innerHTML = "Baker: " + orderDetails.baker;
    document.getElementById("customerColor").innerHTML = "Color: " + orderDetails.color;
    document.getElementById("customerEmail").innerHTML = "Email: " + orderDetails.email;
    document.getElementById("customerSize").innerHTML = "Size: " + orderDetails.size;
    document.getElementById("customerShape").innerHTML = "Shape: " + orderDetails.shape;
    document.getElementById("customerFileName").innerHTML = "File Name: " + orderDetails.file_name;
    document.getElementById("customerCandles").innerHTML = "Candles: " + orderDetails.candles;
    document.getElementById("customerPhone1").innerHTML = "Phone: " +orderDetails.phone;
    document.getElementById("customerDate").innerHTML = "Date: " + orderDetails.date;
    document.getElementById("customerLayers").innerHTML = "Layers: " + orderDetails.layers;
    document.getElementById("customerCakeTier").innerHTML = "Cake Tier: " + orderDetails.cake_tier;
    document.getElementById("customerToppings").innerHTML = "Toppings: " + orderDetails.toppinngs;
    document.getElementById("customerFlavour").innerHTML = "Flavour: " + orderDetails.flavour;
    document.getElementById("customerWeight").innerHTML = "Weight: " + orderDetails.weight;
    document.getElementById("customerNotes").innerHTML = "Notes: " + orderDetails.notes;
    document.getElementById("customerMessage").innerHTML = "Message: " + orderDetails.message;
    $("#customerImage1").attr("src", orderDetails.image);


}).catch((error) => {
    console.log("Error getting document:", error);
});

