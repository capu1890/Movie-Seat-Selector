const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(movieSelect.value);

function setMovieData(e1, e2) {
localStorage.setItem('selectedMovieIndex', e1);
localStorage.setItem('selectedMoviePrice', e2);
};

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    const selectedSeatsCounts = selectedSeats.length;

    count.innerHTML = selectedSeatsCounts;
    total.innerHTML = selectedSeatsCounts * ticketPrice;
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

movieSelect.addEventListener('change', e => {
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
    }

    updateSelectedCount();
});

updateSelectedCount();