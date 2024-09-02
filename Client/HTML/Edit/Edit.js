document.getElementById('editBusForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const plateLetter = document.getElementById('floatingInputOldPlateLetters');
    const plateNumbers = document.getElementById('floatingInputOldPlateNumbers');
    const arrivalTime = document.getElementById('floatingInputArrivalTime');

    const totalLetters = /^[A-Z]{3}$/;
    const totalNumbers = /^\d{3}$/;

    plateLetter.classList.remove('is-invalid');
    plateNumbers.classList.remove('is-invalid');
    arrivalTime.classList.remove('is-invalid');

    let isValid = true;

    if (!totalLetters.test(plateLetter.value.toUpperCase())) {
        plateLetter.classList.add('is-invalid');
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
        const busPlate = plateLetter.value.toUpperCase() + plateNumbers.value;
        const busInfo = {
            tiempoLlegada: arrivalTime.value
        };

        fetch(`http://localhost:3000/buses/${busPlate}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(busInfo)
        })
            .then(response => response.json())
            .then(data => {
                if (data.placa) {
                    alert(`Transmilenio con matrícula ${busPlate} actualizado con éxito.`);
                } else {
                    alert('Error al actualizar el bus: ' + data.message);
                }
            })
            .catch(error => {
                alert('Error al actualizar el bus: ' + error.message);
            });
    }
});