const seatMap = document.getElementById("seat-map");
const loketDiv = document.getElementById("loket");
const backBtn = document.getElementById("back-btn");
const selectedSeatList = document.getElementById("selected-seat-list");
const bookBtn = document.getElementById("book-btn");

let seats = [];
let selectedSeats = [];
let currentView = "full";
let currentLoket = null;

// fungsi membuat data kursi acak
function generateSeats() {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 15; col++) {
      seats.push({
        id: `${row}-${col}`,
        row,
        col,
        status: Math.random() > 0.7 ? "occupied" : "available",
        loket: Math.floor(col / 5),
      });
    }
  }
}

// membuat kursi dipeta
function renderSeats() {
  seatMap.innerHTML = "";
  const seatsToRender =
    currentView === "loket"
      ? seats.filter((seat) => seat.loket === currentLoket)
      : seats;
  seatsToRender.forEach((seat) => {
    const seatBtn = document.createElement("button");
    seatBtn.className = `seat ${seat.status}`;
    seatBtn.dataset.id = seat.id;
    seatBtn.addEventListener("click", () => toggleSeat(seat));
    seatMap.appendChild(seatBtn);
  });
}

// membuat tombol setiap sektor
function renderLoket() {
  const loket = [...new Set(seats.map((seat) => seat.loket))];
  loket.forEach((loket) => {
    const loketBtn = document.createElement("button");
    loketBtn.className = "loket-btn";
    loketBtn.textContent = `Loket ${loket + 1}`;
    loketBtn.addEventListener("click", () => showLoket(loket));
    loketDiv.appendChild(loketBtn);
  });
}

// pilih kursi dan batal
function toggleSeat(seat) {
  if (seat.status === "occupied") return;
  const index = selectedSeats.indexOf(seat.id);
  if (index > -1) {
    selectedSeats.splice(index, 1);
  } else {
    selectedSeats.push(seat.id);
  }
  updateUI();
}

// tampilan kursi untuk sektor
function showLoket(loket) {
  currentLoket = loket;
  currentView = "loket";
  backBtn.style.display = "block";
  loketDiv.style.display = "none";
  renderSeats();
}

// mengembalikan tampilan kursi penuh
function showFullView() {
  currentView = "full";
  backBtn.style.display = "none";
  loketDiv.style.display = "flex";
  renderSeats();
}

// tampilan ui,daftarkursi
function updateUI() {
  const seatElements = document.querySelectorAll(".seat");
  seatElements.forEach((el) => {
    if (selectedSeats.includes(el.dataset.id)) {
      el.classList.add("selected");
    } else {
      el.classList.remove("selected");
    }
  });
  selectedSeatList.textContent =
    selectedSeats.join(", ") || "Ayok pilih Kursi Anda🫵🏻";
}

// ubah status kursi occupied
function bookSeats() {
  selectedSeats.forEach((seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    if (seat) {
      seat.status = "occupied";
    }
  });
}

backBtn.addEventListener("click", showFullView);

bookBtn.addEventListener("click", () => {
  if (selectedSeats.length > 0) {
    alert(`Anda telah memesan kursi: ${selectedSeats.join(", ")}`);
    bookSeats();
    selectedSeats = [];
    renderSeats();
    updateUI();
  } else {
    alert("Silahkan pilih kursi anda terlebih dahulu!");
  }
});

generateSeats();
renderLoket();
renderSeats();
