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
            placa: plateLetters.value.toUpperCase() + plateNumbers.value,
            tiempoLlegada: arrivalTime.value
        };

        fetch('http://localhost:3000/buses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ placa: 'ABD123', tiempoLlegada: '10:30' })
        })
            .then(response => {
                if (!response.ok) {
                    return alert ('Bus ya creado');
                }
                return response.json();
            })
            .then(data => {
                alert(`El Bus ${data.placa} fue creado exitosamente.`);
            })
            .catch(error => {
                errorMessageDiv.textContent = error.message;
                errorMessageDiv.style.display = 'block';
            });
    }
});
