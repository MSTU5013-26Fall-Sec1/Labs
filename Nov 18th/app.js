// The array is the app's data source. Each object has its own tags array
// and isNoteVisible state. isSecrete marks which notes start hidden.
const Contacts = [
  {
    id: 1, firstName: "Maya", lastName: "Chen", phone: "(212) 555-0101",
    email: "maya.chen@example.com", tags: ["Friend", "Design"], gender: "Female",
    pic: "maya", note: "Ask Maya about the Saturday sketch club.",
    isSecrete: false, isNoteVisible: false,
  },
  {
    id: 2, firstName: "Jordan", lastName: "Brooks", phone: "(646) 555-0102",
    email: "jordan.brooks@example.com", tags: ["Work", "Photography"], gender: "Male",
    pic: "jordan", note: "Surprise birthday plans are set for next Friday.",
    isSecrete: true, isNoteVisible: false,
  },
  {
    id: 3, firstName: "Sam", lastName: "Patel", phone: "(917) 555-0103",
    email: "sam.patel@example.com", tags: ["Friend", "Book Club"], gender: "Female",
    pic: "sam", note: "Bring the short story collection to book club.",
    isSecrete: false, isNoteVisible: false,
  },
  {
    id: 4, firstName: "Amara", lastName: "Reed", phone: "(718) 555-0104",
    email: "amara.reed@example.com", tags: ["Family", "Travel"], gender: "Female",
    pic: "amara", note: "Save a copy of our old family photos for Amara.",
    isSecrete: true, isNoteVisible: false,
  },
  {
    id: 5, firstName: "Leo", lastName: "Rivera", phone: "(347) 555-0105",
    email: "leo.rivera@example.com", tags: ["Work", "Music"], gender: "Male",
    pic: "leo", note: "Leo plays bass at the Friday open mic.",
    isSecrete: false, isNoteVisible: false,
  },
  {
    id: 6, firstName: "Riley", lastName: "Morgan", phone: "(929) 555-0106",
    email: "riley.morgan@example.com", tags: ["Friend", "Outdoors"], gender: "Female",
    pic: "riley", note: "Riley is planning a surprise cabin trip for the group.",
    isSecrete: true, isNoteVisible: false,
  },
  {
    id: 7, firstName: "Lina", lastName: "Haddad", phone: "(212) 555-0107",
    email: "lina.haddad@example.com", tags: ["Neighbor", "Gardening"], gender: "Female",
    pic: "lina", note: "Swap herb seedlings when the weather warms up.",
    isSecrete: false, isNoteVisible: false,
  },
  {
    id: 8, firstName: "Evan", lastName: "Park", phone: "(646) 555-0108",
    email: "evan.park@example.com", tags: ["Classmate", "Cooking"], gender: "Male",
    pic: "evan", note: "Pick up the cookbook Evan mentioned as a gift.",
    isSecrete: true, isNoteVisible: false,
  },
  {
    id: 9, firstName: "Avery", lastName: "James", phone: "(917) 555-0109",
    email: "avery.james@example.com", tags: ["Friend", "Coffee"], gender: "Male",
    pic: "avery", note: "Try the new café near the library together.",
    isSecrete: false, isNoteVisible: false,
  },
];

const search = document.querySelector("#search");
const gender = document.querySelector("#gender");
const grid = document.querySelector("#contact-grid");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const template = document.querySelector("#contact-template");

// Portraits are stored in the page so previews can load them directly.
const portraits = JSON.parse(document.querySelector("#portrait-data").textContent);

function getVisibleContacts() {
  const query = search.value.trim().toLowerCase();
  const queryParts = query.split(/\s+/);
  const phoneQuery = /^[\d\s()+.-]+$/.test(query) ? query.replace(/\D/g, "") : "";

  // filter() returns a new array and keeps the original contact objects.
  return Contacts.filter((contact) => {
    const matchesGender = gender.value === "" || contact.gender === gender.value;
    const searchable = [contact.firstName, contact.lastName, contact.phone, contact.email]
      .join(" ").toLowerCase();
    const matchesText = queryParts.every((part) => searchable.includes(part));
    const matchesPhone = phoneQuery !== "" && contact.phone.replace(/\D/g, "").includes(phoneQuery);

    return matchesGender && (matchesText || matchesPhone);
  });
}

function updateNote(card, contact) {
  const note = card.querySelector(".contact-note");
  const toggle = card.querySelector(".note-toggle");
  const showNote = !contact.isSecrete || contact.isNoteVisible;

  note.hidden = !showNote;
  note.textContent = showNote ? contact.note : "";
  toggle.hidden = !contact.isSecrete;
  toggle.textContent = showNote ? "Hide note" : "Show note";
  toggle.setAttribute("aria-expanded", String(showNote));
  toggle.setAttribute("aria-label", `${toggle.textContent} for ${contact.firstName} ${contact.lastName}`);
}

function createContactCard(contact) {
  const card = template.content.firstElementChild.cloneNode(true);
  card.querySelector(".contact-photo").src = portraits[contact.pic];
  card.querySelector(".contact-name").textContent = `${contact.firstName} ${contact.lastName}`;
  card.querySelector(".contact-gender").textContent = contact.gender;

  const phone = card.querySelector(".contact-phone");
  phone.textContent = contact.phone;
  phone.href = `tel:+1${contact.phone.replace(/\D/g, "")}`;

  const email = card.querySelector(".contact-email");
  email.textContent = contact.email;
  email.href = `mailto:${contact.email}`;

  const tags = card.querySelector(".contact-tags");
  contact.tags.forEach((tag) => {
    const badge = document.createElement("li");
    badge.className = "badge rounded-pill";
    badge.textContent = tag;
    tags.append(badge);
  });

  const label = card.querySelector(".note-label");
  label.querySelector("i").classList.add(contact.isSecrete ? "bi-lock" : "bi-journal-text");
  label.querySelector("span").textContent = contact.isSecrete ? "Secret note" : "Note";

  const note = card.querySelector(".contact-note");
  note.id = `note-${contact.id}`;
  const toggle = card.querySelector(".note-toggle");
  toggle.setAttribute("aria-controls", note.id);
  toggle.dataset.contactId = contact.id;
  updateNote(card, contact);
  return card;
}

function renderContacts() {
  const visibleContacts = getVisibleContacts();
  grid.replaceChildren(...visibleContacts.map(createContactCard));
  resultCount.textContent = `${visibleContacts.length} of ${Contacts.length} contacts`;
  emptyState.hidden = visibleContacts.length > 0;
}

// Search and filter events render the matching contacts.
search.addEventListener("input", renderContacts);
gender.addEventListener("change", renderContacts);

document.querySelector("#clear-filters").addEventListener("click", () => {
  search.value = "";
  gender.value = "";
  renderContacts();
  search.focus();
});

// One listener handles every note button, including after the cards rerender.
grid.addEventListener("click", (event) => {
  const toggle = event.target.closest(".note-toggle");
  if (!toggle) return;

  const contact = Contacts.find((item) => item.id === Number(toggle.dataset.contactId));
  contact.isNoteVisible = !contact.isNoteVisible;
  updateNote(toggle.closest(".contact-card"), contact);
});

renderContacts();
