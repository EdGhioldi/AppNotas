package ensolverse.challenge.challenge.repository;

import ensolverse.challenge.challenge.model.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findAllByArchivadaFalse();
    List<Nota> findAllByArchivadaTrue();
}

