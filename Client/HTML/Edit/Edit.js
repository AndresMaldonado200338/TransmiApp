document.getElementById('editBusForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const oldPlateLetters = document.getElementById('floatingInputOldPlateLetters');
    const oldPlateNumbers = document.getElementById('floatingInputOldPlateNumbers');
    const newPlateLetters = document.getElementById('floatingInputNewPlateLetters');
    const newPlateNumbers = document.getElementById('floatingInputNewPlateNumbers');
    const arrivalTime = document.getElementById('floatingInputArrivalTime');

    const totalLetters = /^[A-Z]{3}$/;
    const totalNumbers = /^\d{3}$/;

    oldPlateLetters.classList.remove('is-invalid');
    oldPlateNumbers.classList.remove('is-invalid');
    newPlateLetters.classList.remove('is-invalid');
    newPlateNumbers.classList.remove('is-invalid');
    arrivalTime.classList.remove('is-invalid');

    let isValid = true;

    if (!totalLetters.test(oldPlateLetters.value.toUpperCase())) {
        oldPlateLetters.classList.add('is-invalid');
        isValid = false;
    }

    if (!totalNumbers.test(oldPlateNumbers.value)) {
        oldPlateNumbers.classList.add('is-invalid');
        isValid = false;
    }

    if (!totalLetters.test(newPlateLetters.value.toUpperCase())) {
        newPlateLetters.classList.add('is-invalid');
        isValid = false;
    }

    if (!totalNumbers.test(newPlateNumbers.value)) {
        newPlateNumbers.classList.add('is-invalid');
        isValid = false;
    }

    if (!arrivalTime.value) {
        arrivalTime.classList.add('is-invalid');
        isValid = false;
    }

    if (isValid) {
        const busInfo = {
            old_bus_plate: oldPlateLetters.value.toUpperCase() + oldPlateNumbers.value,
            new_bus_plate: newPlateLetters.value.toUpperCase() + newPlateNumbers.value,
            bus_last_arrival: arrivalTime.value
        };

        fetch('http://localhost:3000/buses', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(busInfo)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Transmilenio con nueva matrícula ${data.new_bus_plate} actualizado con éxito.`);
            } else {
                alert('Error al actualizar el bus: ' + data.message);
            }
        })
        .catch(error => {
            alert('Error al actualizar el bus: ' + error.message);
        });
    }
});
