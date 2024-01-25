    package ensolverse.challenge.challenge.model;


    import jakarta.persistence.Entity;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.Id;
    import lombok.Getter;
    import lombok.Setter;

    @Entity
    @Setter
    @Getter
    public class Nota {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String titulo;
        private String contenido;
        private boolean archivada;


    }

