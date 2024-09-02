document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/buses')
        .then(response => response.json())
        .then(data => {
            const totalBuses = document.getElementById('busesTotales').getElementsByTagName('tbody')[0];
            let busCount = 1;

            data.forEach(bus => {
                const row = totalBuses.insertRow();

                const cellBusCount = row.insertCell(0);
                const cellBusPlate = row.insertCell(1);
                const cellBusLastArrival = row.insertCell(2);
                const cellTotalBusEdit = row.insertCell(3);

                cellBusCount.textContent = busCount++;
                cellBusPlate.textContent = bus.placa;
                cellBusLastArrival.textContent = bus.tiempoLlegada || 'No hay';
                cellTotalBusEdit.textContent = bus.editado || 0;
            });
        })
        .catch(error => {
            console.error('Error de carga de buses:', error);
        });
});