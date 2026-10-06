// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const attendeeList = document.getElementById("attendeeList");

// Track attendance
let count = Number(localStorage.getItem("attendeeCount")) || 0;
const maxCount = 50;
const teamNames = ["water", "zero", "power"];
const savedAttendees = localStorage.getItem("attendees");
let attendees = savedAttendees ? JSON.parse(savedAttendees) : [];

attendeeCount.textContent = count;
progressBar.style.width = `${Math.min(Math.round((count / maxCount) * 100), 100)}%`;

for (let i = 0; i < teamNames.length; i++) {
  const teamCounter = document.getElementById(`${teamNames[i]}Count`);
  const teamCount = Number(localStorage.getItem(`${teamNames[i]}Count`)) || 0;
  teamCounter.textContent = teamCount;
}

function displayAttendees() {
  attendeeList.innerHTML = "";

  for (let i = 0; i < attendees.length; i++) {
    const attendeeItem = document.createElement("li");
    attendeeItem.textContent = `${attendees[i].name} — ${attendees[i].team}`;
    attendeeList.appendChild(attendeeItem);
  }
}

displayAttendees();

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //Increment count
  count++;
  console.log("Total check-ins: ", count);
  attendeeCount.textContent = count;
  localStorage.setItem("attendeeCount", count);

  //Update progress bar
  const percentage = Math.min(Math.round((count / maxCount) * 100), 100);
  progressBar.style.width = `${percentage}%`;
  console.log(`Progress: ${percentage}%`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  const teamCount = Number(teamCounter.textContent) + 1;
  teamCounter.textContent = teamCount;
  localStorage.setItem(`${team}Count`, teamCount);

  attendees.push({ name: name, team: teamName });
  localStorage.setItem("attendees", JSON.stringify(attendees));
  displayAttendees();

  //Show welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}`;
  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  form.reset();
});
