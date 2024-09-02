document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/buses')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('busesTableBody');

            data.forEach(bus => {
                const row = document.createElement('tr');

                const plateCell = document.createElement('td');
                plateCell.textContent = bus.placa;
                row.appendChild(plateCell);

                const arrivalTimeCell = document.createElement('td');
                arrivalTimeCell.textContent = bus.tiempoLlegada;
                row.appendChild(arrivalTimeCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos de los buses:', error);
        });
});
