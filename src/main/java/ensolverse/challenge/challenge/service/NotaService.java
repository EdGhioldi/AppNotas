package ensolverse.challenge.challenge.service;

import ensolverse.challenge.challenge.model.Nota;
import ensolverse.challenge.challenge.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NotaService {
    private final NotaRepository notaRepository;

    @Autowired
    public NotaService(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    public List<Nota> obtenerNotasActivas() {
        // Implementa la lógica para obtener las notas activas
        return notaRepository.findAllByArchivadaFalse();
    }

    public List<Nota> obtenerNotasArchivadas() {
        // Implementa la lógica para obtener las notas archivadas
        return notaRepository.findAllByArchivadaTrue();
    }

    public Optional<Nota> obtenerNotaPorId(Long id) {
        // Implementa la lógica para obtener una nota por su ID
        return notaRepository.findById(id);
    }

    public Nota crearNota(Nota nota) {
        // Implementa la lógica para crear una nueva nota
        return notaRepository.save(nota);
    }

    public Nota actualizarNota(Long id, Nota nota) {
        // Implementa la lógica para actualizar una nota existente
        if (notaRepository.existsById(id)) {
            nota.setId(id);
            return notaRepository.save(nota);
        } else {
            return null;
        }
    }

    public void eliminarNota(Long id) {
        // Implementa la lógica para eliminar una nota por su ID
        notaRepository.deleteById(id);
    }

    public Nota archivarDesarchivarNota(Long id) {
        // Implementa la lógica para archivar/desarchivar una nota
        Optional<Nota> optionalNota = notaRepository.findById(id);
        if (optionalNota.isPresent()) {
            Nota nota = optionalNota.get();
            nota.setArchivada(!nota.isArchivada());
            return notaRepository.save(nota);
        } else {
            return null;
        }
    }
}
