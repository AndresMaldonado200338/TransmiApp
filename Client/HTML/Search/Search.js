document.getElementById('searchBusForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const plateLetters = document.getElementById('floatingInputPlateLetters');
    const plateNumbers = document.getElementById('floatingInputPlateNumbers');

    const totalLetters = /^[A-Z]{3}$/;
    const totalNumbers = /^\d{3}$/;

    plateLetters.classList.remove('is-invalid');
    plateNumbers.classList.remove('is-invalid');

    let isValid = true;

    if (!totalLetters.test(plateLetters.value.toUpperCase())) {
        plateLetters.classList.add('is-invalid');
        isValid = false;
    }

    if (!totalNumbers.test(plateNumbers.value)) {
        plateNumbers.classList.add('is-invalid');
        isValid = false;
    }

    if (isValid) {
        const plate = plateLetters.value.toUpperCase() + plateNumbers.value;
        fetch(`http://localhost:3000/buses/${plate}`)
            .then(response => response.json())
            .then(data => {
                const busInfoContainer = document.getElementById('busInfoContainer');
                const busInfoTableBody = document.getElementById('busInfoTableBody');
                
                busInfoTableBody.innerHTML = '';

                if (data.placa) {
                    const row = busInfoTableBody.insertRow();
                    const cellPlate = row.insertCell(0);
                    const cellEditCount = row.insertCell(1);

                    cellPlate.textContent = data.placa;
                    cellEditCount.textContent = data.editado;

                    busInfoContainer.style.display = 'block';
                } else {
                    busInfoContainer.style.display = 'none';
                    alert('Bus no encontrado.');
                }
            })
            .catch(error => {
                alert('Error al buscar el bus: ' + error.message);
            });
    }
});
