document.addEventListener('DOMContentLoaded', () => {
    // Carga el header en cada página
    fetch('/Client/HTML/Header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            // De la URL solo es toma el que vaya despues del "/"
            const path = window.location.pathname.split('/').pop();

            // Se elimina el active en todas las clases
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });

            // Se verifica la ruta actual y aplica la clase "active" al enlace correspondiente
            const navLinks = {
                'Index.html': 'nav-home',
                'create.html': 'nav-create',
                'edit.html': 'nav-edit',
                'show.html': 'nav-show',
                'search.html': 'nav-search',
                'delete.html': 'nav-delete'
            };

            const activeLinkId = navLinks[path];
            if (activeLinkId) {
                const activeLink = document.getElementById(activeLinkId);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        })
        .catch(error => console.error('Error al cargar el header:', error));
});
