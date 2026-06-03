document.addEventListener("DOMContentLoaded", function () {

  // ================== COMPLAINT SECTION ==================
  const form = document.getElementById("complaintForm");
  const name = document.getElementById("fullName");
  const mobile = document.getElementById("mobile");
  const address = document.getElementById("address");
  const district = document.getElementById("district");
  const details = document.getElementById("details");

  const charCount = document.getElementById("charCount");
  const historyList = document.getElementById("historyList");

  const searchID = document.getElementById("searchID");
  const checkStatus = document.getElementById("checkStatus");
  const statusResult = document.getElementById("statusResult");

  // Time display
  function showTime() {
    let now = new Date();
    document.getElementById("timeDisplay").textContent =
      "Current Time: " + now.toLocaleTimeString();
  }
  setInterval(showTime, 1000);

  // Character count
  details.addEventListener("input", function () {
    charCount.textContent = details.value.length + " characters";
  });

  // Mobile validation
  mobile.addEventListener("blur", function () {
    if (!/^[0-9]{10}$/.test(mobile.value)) {
      alert("Enter valid 10 digit mobile number");
      mobile.focus();
    }
  });

  // Name validation
  name.addEventListener("input", function () {
    name.value = name.value.replace(/[0-9]/g, "");
  });

  // Submit complaint
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!name.value || !mobile.value || !address.value || !details.value) {
      alert("Please fill all fields");
      return;
    }

    if (district.selectedIndex == 0) {
      alert("Select district");
      return;
    }

    let id = "FIR" + Math.floor(Math.random() * 100000);
    let time = new Date().toLocaleString();

    let complaint = {
      id,
      name: name.value,
      district: district.value,
      status: "Under Investigation",
      time
    };

    fetch("http://localhost:3000/addComplaint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(complaint)
    });

    alert("Complaint Registered\nYour Complaint ID: " + id);
    form.reset();
    loadHistory();
  });

  // Load history
  function loadHistory() {
    historyList.innerHTML = "";

    fetch("http://localhost:3000/getComplaints")
      .then(res => res.json())
      .then(data => {
        data.forEach(c => {
          let li = document.createElement("li");
          li.textContent = `${c.id} - ${c.name} (${c.district}) - ${c.time}`;
          historyList.appendChild(li);
        });
      });
  }

  loadHistory();

  // Check status
  checkStatus.addEventListener("click", function () {
    let id = searchID.value;

    fetch("http://localhost:3000/getStatus/" + id)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          statusResult.textContent = "Status: " + data.status;
        } else {
          statusResult.textContent = "Complaint ID not found";
        }

        setTimeout(() => statusResult.textContent = "", 5000);
      });
  });

});


// ================== EVENT SECTION ==================
$(document).ready(function () {

  // Toggle event details
  $(".toggleBtn").click(function () {
    let parent = $(this).closest(".event");

    parent.find(".eventDetails").slideToggle();

    let btn = $(this);
    btn.text(btn.text() === "Show Details" ? "Hide Details" : "Show Details");

    $(".event").removeClass("highlight");
    parent.addClass("highlight");

    parent.find("h3").css("color", "blue");

    let title = parent.find("h3").text();
    alert("Event: " + title);
  });

  // Auto fill event name
  $(".registerBtn").click(function () {
    let title = $(this).closest(".event").find("h3").text();
    $("#eventName").val(title);

    $("html, body").animate({
      scrollTop: $("#eventForm").offset().top
    }, 500);
  });

  // Submit event form (CONNECTED TO MYSQL)
  $("#eventForm").submit(function (e) {
    e.preventDefault();

    let name = $("#pname").val().trim();
    let email = $("#email").val().trim();
    let mobile = $("#mobileNum").val().trim();
    let event = $("#eventName").val();

    let valid = true;

    $("input").css("border", "");

    if (name === "") {
      valid = false;
      $("#pname").css("border", "2px solid red");
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      valid = false;
      $("#email").css("border", "2px solid red");
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      valid = false;
      $("#mobileNum").css("border", "2px solid red");
    }

    if (!valid) {
      $("#msg").text("Invalid input!").addClass("error");
      return;
    }

    // Generate registration number
    let regno = "REG" + Math.floor(Math.random() * 10000);

    let events = [event];

    // SEND DATA TO EXPRESS SERVER
    fetch("http://localhost:3000/registerEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        regno,
        name,
        email,
        mobile,
        events
      })
    })
      .then(res => res.json())
      .then(data => {

        if (data.error) {
          $("#msg").text(data.error).addClass("error");
        } else {
          $("#msg")
            .text(data.message + " (ID: " + regno + ")")
            .removeClass()
            .addClass("success");

          $("#submitBtn").prop("disabled", true).text("Registered");
        }

      });
  });

  // Reset form
  $("#resetBtn").click(function () {
    $("#msg").text("");
    $("input").css("border", "");
    $("#submitBtn").prop("disabled", false).text("Submit");
  });

});