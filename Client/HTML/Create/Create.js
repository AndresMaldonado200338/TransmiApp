document.getElementById('newBusForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const plateLetters = document.getElementById('floatingInputPlateLetters');
    const plateNumbers = document.getElementById('floatingInputPlateNumbers');
    const arrivalTime = document.getElementById('floatingInputArrivalTime');

    const totalLetters = /^[A-Z]{3}$/;
    const totalNumbers = /^\d{3}$/;

    plateLetters.classList.remove('is-invalid');
    plateNumbers.classList.remove('is-invalid');
    arrivalTime.classList.remove('is-invalid');

    let isValid = true;

    if (!totalLetters.test(plateLetters.value.toUpperCase())) {
        plateLetters.classList.add('is-invalid');
        isValid = false;
    }

    if (!totalNumbers.test(plateNumbers.value)) {
        plateNumbers.classList.add('is-invalid');
        isValid = false;
    }

    if (!arrivalTime.value) {
        arrivalTime.classList.add('is-invalid');
        isValid = false;
    }

    if (isValid) {
        const busInfo = {
            bus_plate: plateLetters.value.toUpperCase() + plateNumbers.value,
            bus_last_arrival: arrivalTime.value
        };

        fetch('http://localhost:3000/buses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ placa: 'ABD123', tiempoLlegada: '10:30' })
        })
        .then(response => response.json())
        .then(data => {
            alert(`Transmilenio con matrícula ${data.bus_plate} creado con éxito.`);
        })
        .catch(error => {
            alert('Error al crear el bus: ' + error.message);
        });
    }
});
