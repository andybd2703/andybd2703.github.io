document.addEventListener("DOMContentLoaded", () => {
    const sectionSelect = document.getElementById('section');
    const titleInput = document.getElementById('title');
    const detailsInput = document.getElementById('details');
    const addEntryButton = document.getElementById('addEntry');
    const editEntryButton = document.getElementById('editEntry');
    const deleteEntryButton = document.getElementById('deleteEntry');

    let selectedEntry = null;

    // Añadir una nueva entrada
    addEntryButton.addEventListener('click', () => {
        const section = sectionSelect.value;
        const title = titleInput.value.trim();
        const details = detailsInput.value.trim();

        if (title === '' || details === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const sectionElement = document.getElementById(section);
        const ul = sectionElement.querySelector('ul');
        const li = document.createElement('li');
        li.innerHTML = `${title} <p>${details}</p>`;
        li.classList.add('entry-item');
        ul.appendChild(li);
        selectedEntryHandler(li);

        // Limpiar campos
        titleInput.value = '';
        detailsInput.value = '';
    });

    // Editar la entrada seleccionada
    editEntryButton.addEventListener('click', () => {
        if (selectedEntry) {
            const newTitle = prompt("Modificar el título de la entrada", selectedEntry.childNodes[0].textContent);
            const newDetails = prompt("Modificar los detalles de la entrada", selectedEntry.querySelector('p').textContent);
            if (newTitle && newDetails) {
                selectedEntry.innerHTML = `${newTitle} <p>${newDetails}</p>`;
                selectedEntry.classList.add('entry-item');
            }
        } else {
            alert("Seleccione una entrada para modificar");
        }
    });

    // Eliminar la entrada seleccionada
    deleteEntryButton.addEventListener('click', () => {
        if (selectedEntry) {
            selectedEntry.parentNode.removeChild(selectedEntry);
            selectedEntry = null;
        } else {
            alert("No has seleccionado ninguna entrada para eliminar");
        }
    });

    // Manejar la selección de una entrada
    function selectedEntryHandler(entry) {
        entry.addEventListener("click", () => {
            if (selectedEntry) {
                selectedEntry.classList.remove('selected');
            }
            selectedEntry = entry;
            selectedEntry.classList.add('selected');
        });
    }

    // Inicializar entradas existentes (si las hay)
    document.querySelectorAll('.entry-item').forEach(entry => {
        selectedEntryHandler(entry);
    });
});
