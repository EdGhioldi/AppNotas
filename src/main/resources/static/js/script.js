const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button");

let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

async function showNotes() {
    try {
        const response = await fetch('/api/notas/activas');
        const notasActivas = await response.json();

        document.querySelectorAll(".note").forEach(li => li.remove());

        notasActivas.forEach((note, id) => {
            let filterDesc = note.contenido.replaceAll("\n", '<br/>');
            let liTag = `<li class="note">
                            <div class="details">
                                <p>${note.titulo}</p>
                                <span>${filterDesc}</span>
                            </div>
                            <div class="bottom-content">
                                <div class="settings">
                                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                    <ul class="menu">
                                        <li onclick="updateNote(${note.id}, '${note.titulo}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                        <li onclick="deleteNote(${note.id})"><i class="uil uil-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </div>
                        </li>`;
            addBox.insertAdjacentHTML("afterend", liTag);
        });
    } catch (error) {
        console.error('Error al obtener notas activas:', error);
    }
}

showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

async function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if (!confirmDel) return;

    try {
        const response = await fetch(`/api/notas/${noteId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const deletedNoteElement = document.querySelector(`.note:nth-child(${noteId + 1})`);
            if (deletedNoteElement) {
                deletedNoteElement.remove();
            }

            showNotes();
        } else {
            console.error('Error al eliminar la nota en el backend:', response.statusText);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud al backend:', error);
    }
}

async function updateNote(noteId, title, filterDesc) {
    try {
        const response = await fetch(`/api/notas/${noteId}`);
        const nota = await response.json();

        titleTag.value = nota.titulo;
        descTag.value = nota.contenido.replaceAll("\n", '\r\n');
        popupTitle.innerText = "Update a Note";
        addBtn.innerText = "Update Note";

        popupBox.classList.add("show");
        document.querySelector("body").style.overflow = "hidden";
        if (window.innerWidth > 660) titleTag.focus();

        isUpdate = true;
        updateId = noteId;
    } catch (error) {
        console.error('Error al obtener la nota para edición:', error);
    }
}

addBtn.addEventListener("click", async e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
        description = descTag.value.trim();

    if (title || description) {
        let noteInfo = { titulo: title, contenido: description };

        if (!isUpdate) {
            try {
                const response = await fetch('/api/notas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(noteInfo),
                });

                if (response.ok) {
                    showNotes();
                    closeIcon.click();
                } else {
                    console.error('Error al crear la nota en el backend:', response.statusText);
                }
            } catch (error) {
                console.error('Error al realizar la solicitud al backend:', error);
            }
        } else {
            try {
                const response = await fetch(`/api/notas/${updateId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(noteInfo),
                });

                if (response.ok) {
                    showNotes();
                    closeIcon.click();
                } else {
                    console.error('Error al actualizar la nota en el backend:', response.statusText);
                }
            } catch (error) {
                console.error('Error al realizar la solicitud al backend:', error);
            }
        }
    }
});
