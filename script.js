const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

calculateTotal();

container.addEventListener('click',function (e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved'))
    {
        e.target.classList.toggle('selected'); //toggle metodu değiştirme işlemi yapar.selected classı varsa kaldırır, yoksa ekler.
        calculateTotal();
    }
});

select.addEventListener('change',function (e){
    calculateTotal();
})

function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat){
        selectedSeatArr.push(seat);
    })
    selectedSeats.forEach(function(seat){
        seatsArr.push(seat);
    })

    let selectedSeatIndex = selectedSeatArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })

    let selectedSeatCount = selectedSeats.length;

    count.innerText = selectedSeatCount;

    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndex);

}

function saveToLocalStorage(indexes){
    localStorage.setItem('selectedSeats' , JSON.stringify(indexes));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function (seat,index) {
            if(selectedSeats.indexOf(index) > -1){     //seçili koltuklarun UI üzerinde sarı boyanması için fonk.
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}