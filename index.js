let totalBookings = 0;
let bookedSeats = []; 

const form = document.getElementById('myform');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    const seatNumber = parseInt(document.getElementById('seatNumber').value);
    if (bookedSeats.some(user => user.seatNumber === seatNumber)) {
        alert('Seat is already booked.');
        return; 
    }
    const userDetails = {
        username,
        seatNumber,
    };
    axios.post("https://crudcrud.com/api/35152cba16f04f62ac0dc5d087d27344/PiyushMovie", userDetails)
        .then((response) => {
            console.log(response);
            totalBookings++; 
            updateTotalBookingsCount(); 
            alert('Booked');
            show(response.data);
            bookedSeats.push(userDetails); 
        })
        .catch((err) => {
            console.log(err);
        });
});
axios.get("https://crudcrud.com/api/35152cba16f04f62ac0dc5d087d27344/PiyushMovie")
    .then((response) => {
        console.log(response);
        totalBookings = response.data.length; 
        updateTotalBookingsCount(); 
        bookedSeats = response.data;
        for (let i = 0; i < response.data.length; i++) {
            show(response.data[i]);
        }
    })
    .catch((err) => {
        console.log(err);
    });
function show(userDetails) {
    const userList = document.getElementById("userList");
    const list = document.createElement("li");
    list.textContent = userDetails.username + ' - ' + userDetails.seatNumber;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = () => {
        axios.delete(`https://crudcrud.com/api/35152cba16f04f62ac0dc5d087d27344/PiyushMovie/${userDetails._id}`)
            .then((response) => {
                console.log(response);
                userList.removeChild(list);
                totalBookings--; 
                updateTotalBookingsCount(); 
                const index = bookedSeats.findIndex(user => user._id === userDetails._id);
                if (index !== -1) {
                    bookedSeats.splice(index, 1); 
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.onclick = () => {
        axios.delete(`https://crudcrud.com/api/35152cba16f04f62ac0dc5d087d27344/PiyushMovie/${userDetails._id}`)
            .then((response) => {
                console.log(response);
                userList.removeChild(list);
                document.getElementById("username").value = userDetails.username;
                document.getElementById("seatNumber").value = userDetails.seatNumber;
                const index = bookedSeats.findIndex(user => user._id === userDetails._id);
                if (index !== -1) {
                    bookedSeats.splice(index, 1); 
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    list.appendChild(del);
    list.appendChild(edit);
    userList.appendChild(list);
}
function updateTotalBookingsCount() {
    const totalBookingsElement = document.getElementById("totalBookings");
    totalBookingsElement.textContent = `Total Bookings: ${totalBookings}`;
}

const filter = document.getElementById("filter");
filter.addEventListener("keyup", function(event) {
    const textEntered = event.target.value.trim(); 
    const userList = document.getElementById("userList");
    for (let i = 0; i < userList.children.length; i++) {
        const seatNumber = parseInt(userList.children[i].textContent.split('-')[1].trim()); 
        if (textEntered === "") { 
            userList.children[i].style.display = "block"; 
        } else {
            if (seatNumber !== parseInt(textEntered)) { 
                userList.children[i].style.display = "none";
            } else {
                userList.children[i].style.display = "block";
            }
        }
    }
});

