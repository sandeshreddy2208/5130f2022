// Your web app's Firebase configuration
//import {getFirestore, collection, getDocs, addDoc} from firestore

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
const colRef = db.collection("orders");
var orderNo;
let Location = [];

//get Docs count 


colRef.get().then((snapshot) => {
  let orders = []
  snapshot.docs.forEach(doc => {
    orders.push({ ...doc.data(), id: doc.id })
  });
  orderNo = orders.length;
}).catch((error) => {
  console.log("Error getting document:", error);
});



// Animation on scroll
AOS.init({
  duration: 800,
  easing: "slide",
});

(function ($) {
  "use strict";
  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: "scroll",
  });

  //   full height
  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight(); //call that function

  // navbar scroll
  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $(".ftco_navbar"),
        sd = $(".js-scroll-wrap");
      if (st > 150) {
        if (!navbar.hasClass("scrolled")) {
          navbar.addClass("scrolled");
        }
      }
      if (st < 150) {
        if (navbar.hasClass("scrolled")) {
          navbar.removeClass("scrolled sleep");
        }
      }

      if (st > 350) {
        if (!navbar.hasClass("awake")) {
          navbar.addClass("awake");
        }
        if (sd.length > 0) {
          sd.addClass("sleep");
        }
      }

      if (st < 350) {
        if (navbar.hasClass("awake")) {
          navbar.removeClass("awake");
          navbar.addClass("sleep");
        }
        if (sd.length > 0) {
          sd.removeClass("sleep");
        }
      }
    });
  };
  scrollWindow();

  $.Scrollax();

  //   carousel
  var carousel = function () {
    $(".home-slider").owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      nav: true,
      dots: false,
      autoplayHoverPause: false,
      items: 1,
      navText: [
        "<span class = 'ion-ios-arrow-back'></span>",
        "<span class = 'ion-ios-arrow-forward'></span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
    $(".carousel-testimony").owlCarousel({
      loop: true,
      autoplay: true,
      center: true,
      margin: 30,
      nav: false,
      stagePadding: 0,
      items: 1,
      navText: [
        "<span class = 'ion-ios-arrow-back'></span>",
        "<span class = 'ion-ios-arrow-forward'></span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  };
  carousel();

  var counter = function () {
    $("#section-counter").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          var comma_seperator_number_step = $.animateNumber.numberStepFactories.separator(
            ","
          );
          $(".number").each(function () {
            var $this = $(this),
              num = $this.data("number");
            //console.log(num);
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_seperator_number_step,
              },
              7000
            );
          });
        }
      },
      { offset: "95%" }
    );
  };
  counter();

  var contentWayPoint = function () {
    var i = 0;
    $(".ftco-animate").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          i++;
          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .ftco-animate.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn ftco-animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft ftco-animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight ftco-animated");
                  } else {
                    el.addClass("fadeInUp ftco-animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "95%" }
    );
  };
  contentWayPoint();

  $("#book_date").datepicker({
    format: "m/d/yyyy",
    autoclose: true,
  });
  $("#book_time").timepicker();
})(jQuery);

var image;
const types = ['image/png', 'image/jpeg', 'image/jpg'];

function onImageUpload(e) {
  let selectedFile = e.target.files[0];
  if (selectedFile && types.includes(selectedFile.type)) {
    image = selectedFile;
  }
  else {
    alert("File Type must be jpg/jpeg/png");
    return;
  }
}

function orderForm(e) {
  e.preventDefault();
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on('state_changed', snapshot => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(progress);
  }, err => {

    alert(err.message)
  }, () => {
    storage.ref('images').child(image.name).getDownloadURL().then(url => {

      var bakers = document.getElementById("bakers").options[document.getElementById("bakers").selectedIndex].text;
      var name = document.getElementById("name").value;
      var color = document.getElementById("color").value;
      var email = document.getElementById("email").value;
      var size = document.getElementById("size").value;
      var shape = document.getElementById("shape").value;
      var file_name = document.getElementById("file").value;
      var candles = document.getElementById("candles").value;
      var phone = document.getElementById("phone").value;
      var date = document.getElementById("book_date").value;
      var layers = document.getElementById("layers").value;
      var toppinngs = document.getElementById("toppings").value;
       var flavour = document.getElementById("flavour").value;
       var weight = document.getElementById("kg").value;
      var cake_tier = document.getElementById("cake-tier").options[document.getElementById("cake-tier").selectedIndex].text;
      var message = document.getElementById("message").value;
      var notes = document.getElementById("notes").value;
  
        // Create User data
        var user_data = {
          name: name,
          id: Math.random(),
          image: url,
          timestamp: Date.now(),
          baker:bakers,
          color: color,
          email:email,
          size:size,
          shape:shape,
          file_name:file_name,
          candles:candles,
          phone:phone,
          date:date,
          layers:layers,
          cake_tier : cake_tier,
          toppinngs: toppinngs,
          flavour: flavour,
          weight: weight,
          notes: notes,
          message: message
        }
      orderNo = (orderNo + 1).toString();
      colRef.doc(orderNo).set(user_data);
      alert("Order No: " + orderNo + " created successfully!\n click on link " + window.location.href + "orderSummary.html#" + orderNo);
      orderNo = Number(orderNo);
    })
      .catch(function (error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
      })

  })
}

function onLocation(e) {
  var zipcode = document.getElementById('zipcode').value;
  const colRefLoc = db.collection(zipcode);
  colRefLoc.get().then((snapshot) => {
    let loc = []
    snapshot.docs.forEach(doc => {
      loc.push({ ...doc.data(), id: doc.id })
    });
    Location = loc;
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

  // var select = document.getElementById("bakers");
  // for (index in Location) {
  //   select.options[select.options.length] = new Option(Location[index], index);
  // }

}
