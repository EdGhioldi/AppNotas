#!/bin/bash

# Configurar el entorno (utilizando variables de entorno)
  export SPRING_PROFILES_ACTIVE=development
  export DATABASE_URL=jdbc:mysql://localhost:3306/mi_base_de_datos
  export DATABASE_USERNAME=mi_usuario
  export DATABASE_PASSWORD=mi_contraseña

# Construir y ejecutar la aplicación
  ./mvnw clean install
  java -jar "$APP_JAR"
