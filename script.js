// K Explore — event data and page interactions.
// You can add, remove, or edit events in this array.
const events = [
  {id:1,title:"Rhythm & Roots Festival",category:"Music",date:"2026-12-12T17:00:00",dateLabel:"12 DEC 2026 · 5:00 PM",venue:"Ekamra Haat, Bhubaneswar",description:"An open-air celebration of independent music, local artists and unforgettable live performances. Bring your friends and find your rhythm.",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80"},
  {id:2,title:"Future Forward Summit",category:"Technology",date:"2026-12-20T09:30:00",dateLabel:"20 DEC 2026 · 9:30 AM",venue:"KIIT Convention Centre, Bhubaneswar",description:"Meet curious minds, explore emerging technology and hear fresh ideas from builders, designers and innovators.",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80"},
  {id:3,title:"The Art of Seeing",category:"Art",date:"2027-01-09T11:00:00",dateLabel:"09 JAN 2027 · 11:00 AM",venue:"Regional Museum of Natural History, Bhubaneswar",description:"A colourful day of visual art, creative workshops and conversations with artists. Come curious and leave inspired.",image:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80"},
  {id:4,title:"Sunday Reset: Wellness Day",category:"Wellness",date:"2027-01-17T07:00:00",dateLabel:"17 JAN 2027 · 7:00 AM",venue:"Biju Patnaik Park, Bhubaneswar",description:"Slow down with guided yoga, mindful movement and simple ways to bring more balance into everyday life. All experience levels welcome.",image:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80"},
  {id:5,title:"Creators' Meetup",category:"Technology",date:"2027-01-24T10:00:00",dateLabel:"24 JAN 2027 · 10:00 AM",venue:"A community studio, Bhubaneswar",description:"A friendly space for designers, developers and makers to share work, exchange feedback and find their next collaborator.",image:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"},
  {id:6,title:"Acoustic Evenings",category:"Music",date:"2027-02-06T18:30:00",dateLabel:"06 FEB 2027 · 6:30 PM",venue:"Dhauli Riverside, Bhubaneswar",description:"Unplug, settle in and enjoy an intimate evening of acoustic sets, warm lights and good company beside the river.",image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80"}
];

const eventGrid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const eventCount = document.getElementById("eventCount");
const emptyState = document.getElementById("emptyState");
const eventModal = document.getElementById("eventModal");
const registerModal = document.getElementById("registerModal");
let selectedCategory = "All";
let selectedEventId = null;

function formatShortDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {day:"2-digit",month:"short",year:"numeric"});
}

function renderEvents() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = events.filter(event => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch = (event.title + " " + event.description + " " + event.venue + " " + event.category).toLowerCase().includes(keyword);
    return matchesCategory && matchesSearch;
  });
  eventGrid.innerHTML = filtered.map(event => `
    <article class="event-card" tabindex="0" role="button" aria-label="View ${event.title}" data-event-id="${event.id}">
      <div class="event-image-wrap"><img src="${event.image}" alt="${event.title}" loading="lazy"><span class="category-tag">${event.category.toUpperCase()}</span></div>
      <div class="event-card-body">
        <div class="event-date">${formatShortDate(event.date)} · ${new Date(event.date).toLocaleTimeString("en-IN",{hour:"numeric",minute:"2-digit"})}</div>
        <h3>${event.title}</h3><p>${event.description}</p>
        <div class="event-footer"><span>⌖ &nbsp;${event.venue}</span><b class="event-arrow">↗</b></div>
      </div>
    </article>`).join("");
  eventCount.textContent = String(filtered.length).padStart(2,"0");
  emptyState.hidden = filtered.length !== 0;
}

function openEvent(eventId) {
  const event = events.find(item => item.id === Number(eventId));
  if (!event) return;
  selectedEventId = event.id;
  document.getElementById("modalImage").src = event.image;
  document.getElementById("modalImage").alt = event.title;
  document.getElementById("modalCategory").textContent = event.category.toUpperCase();
  document.getElementById("modalTitle").textContent = event.title;
  document.getElementById("modalMeta").textContent = `◷ ${event.dateLabel}     ⌖ ${event.venue}`;
  document.getElementById("modalDescription").textContent = event.description;
  updateCountdown(event);
  eventModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function updateCountdown(event) {
  const diff = new Date(event.date).getTime() - Date.now();
  const output = document.getElementById("countdown");
  if (diff <= 0) { output.textContent = "This event has started or passed."; return; }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  output.textContent = `✦ ${days} days · ${hours} hours · ${minutes} minutes to go`;
}

function openRegistration(eventId = null) {
  selectedEventId = eventId || selectedEventId;
  const select = document.getElementById("eventSelect");
  select.innerHTML = '<option value="">Choose an event</option>' + events.map(event =>
    `<option value="${event.id}">${event.title}</option>`).join("");
  if (selectedEventId) select.value = String(selectedEventId);
  document.getElementById("registrationForm").hidden = false;
  document.getElementById("successMessage").hidden = true;
  document.getElementById("formError").textContent = "";
  eventModal.hidden = true;
  registerModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModals() {
  eventModal.hidden = true;
  registerModal.hidden = true;
  document.body.style.overflow = "";
}

eventGrid.addEventListener("click", event => {
  const card = event.target.closest("[data-event-id]");
  if (card) openEvent(card.dataset.eventId);
});
eventGrid.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    const card = event.target.closest("[data-event-id]");
    if (card) { event.preventDefault(); openEvent(card.dataset.eventId); }
  }
});
searchInput.addEventListener("input", renderEvents);
document.getElementById("categoryFilters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = button.dataset.category;
  document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
  renderEvents();
});
document.getElementById("modalRegister").addEventListener("click", () => openRegistration(selectedEventId));
document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", closeModals));
[eventModal, registerModal].forEach(modal => modal.addEventListener("click", event => {
  if (event.target === modal) closeModals();
}));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModals(); });

document.getElementById("registrationForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const eventId = document.getElementById("eventSelect").value;
  const error = document.getElementById("formError");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+\-\s()]{10,15}$/;
  if (name.length < 2) { error.textContent = "Please enter your name (at least 2 characters)."; return; }
  if (!emailPattern.test(email)) { error.textContent = "Please enter a valid email address."; return; }
  if (!phonePattern.test(phone) || phone.replace(/\D/g,"").length < 10) { error.textContent = "Please enter a valid phone number with at least 10 digits."; return; }
  if (!eventId) { error.textContent = "Please choose an event."; return; }

  const chosenEvent = events.find(item => item.id === Number(eventId));
  const registrations = JSON.parse(localStorage.getItem("kExploreRegistrations") || "[]");
  registrations.push({name,email,phone,eventId:Number(eventId),eventTitle:chosenEvent.title,registeredAt:new Date().toISOString()});
  localStorage.setItem("kExploreRegistrations", JSON.stringify(registrations));
  document.getElementById("registrationForm").hidden = true;
  document.getElementById("successText").textContent = `Thanks, ${name}! Your registration for ${chosenEvent.title} has been saved in this browser.`;
  document.getElementById("successMessage").hidden = false;
});
document.getElementById("successClose").addEventListener("click", closeModals);

const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("kExploreTheme") === "dark") document.body.classList.add("dark");
function updateThemeIcon() { themeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "☾"; }
updateThemeIcon();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("kExploreTheme", document.body.classList.contains("dark") ? "dark" : "light");
  updateThemeIcon();
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded","false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
renderEvents();
