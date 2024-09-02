document.getElementById('deleteBusForm').addEventListener('submit', function (event) {
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
        const busPlate = plateLetters.value.toUpperCase() + plateNumbers.value;

        fetch(`http://localhost:3000/buses/${busPlate}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Bus eliminado exitosamente.') {
                alert(`Transmilenio con matrícula ${busPlate} eliminado con éxito.`);
            } else {
                alert('Error al eliminar el bus: ' + data.message);
            }
        })
        .catch(error => {
            alert('Error al eliminar el bus: ' + error.message);
        });
    }
});
