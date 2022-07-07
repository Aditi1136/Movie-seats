const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let resetButton =  document.getElementById('resetButton');
let saveButton =  document.getElementById('saveButton');

populateUI();

let ticketPrice = +movieSelect.value;// + sign will convert string into number

//Save Selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
//update total and count
function updateSelectedCount(){
    let selectedSeats = document.querySelectorAll('.row .seat.selected');
    //querySelectorAll creates a nodeList ad keep count if printed on console.

    const seatsIndex = [...selectedSeats].map((seat)=>[...seats].indexOf(seat))
    

    //spread operator, map works similar to forEach but it returns an array.

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get the data from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if (selectedSeats!== null && selectedSeats.length>0){
        seats.forEach((seat,index)=> {
            if(selectedSeats.indexOf(index)> -1){
                seat.classList.add('selected');
            }
        });
    }
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
  

//Movie Select Event
movieSelect.addEventListener('change', (e)=> {
    
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
    
})


//Seat Click Event 
container.addEventListener('click', (e)=> {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    };
});

resetButton.addEventListener('click', (e)=> {
    let deselectedSeats = document.querySelectorAll('.row .seat.selected');
    deselectedSeats.forEach(function (element) {
        element.classList.remove('selected');
      });
    updateSelectedCount();
})


saveButton.addEventListener('click', (e)=> {
// initial count and total set
    populateUI();
    
});
updateSelectedCount();