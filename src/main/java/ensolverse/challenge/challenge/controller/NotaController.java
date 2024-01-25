package ensolverse.challenge.challenge.controller;

import ensolverse.challenge.challenge.model.Nota;
import ensolverse.challenge.challenge.service.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
public class NotaController {
    private final NotaService notaService;

    @Autowired
    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @GetMapping("/activas")
    public List<Nota> obtenerNotasActivas() {
        return notaService.obtenerNotasActivas();
    }

    @GetMapping("/archivadas")
    public List<Nota> obtenerNotasArchivadas() {
        return notaService.obtenerNotasArchivadas();
    }

    @GetMapping("/{id}")
    public Nota obtenerNotaPorId(@PathVariable Long id) {
        return notaService.obtenerNotaPorId(id).orElse(null);
    }

    @PostMapping
    public Nota crearNota(@RequestBody Nota nota) {
        return notaService.crearNota(nota);
    }

    @PutMapping("/{id}")
    public Nota actualizarNota(@PathVariable Long id, @RequestBody Nota nota) {
        return notaService.actualizarNota(id, nota);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarNota(@PathVariable Long id) {
        notaService.eliminarNota(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/archivar-desarchivar")
    public Nota archivarDesarchivarNota(@PathVariable Long id) {
        return notaService.archivarDesarchivarNota(id);
    }
}
