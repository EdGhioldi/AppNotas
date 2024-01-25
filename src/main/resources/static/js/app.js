fetch('http://localhost:8080/api/notas/activas')
    .then(response => response.json())
    .then(notas => {
        console.log(notas);
    })
    .catch(error => console.error('Error al obtener notas:', error));