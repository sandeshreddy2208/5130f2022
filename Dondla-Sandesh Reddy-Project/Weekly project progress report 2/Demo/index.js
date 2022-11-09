var text = document.getElementById("text");
var button = document.getElementById("button");

    var firebaseRef = app.database().ref();
    firebaseRef.child("Text").set("Hello!");
