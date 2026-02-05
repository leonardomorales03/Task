# 📋 Task Management API

> Una API RESTful robusta y ligera para la gestión eficiente de tareas, construida con Java y Spring Boot.

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)

---

## 📑 Tabla de Contenidos

1. [Descripción Detallada](#-descripción-detallada)
2. [Interfaz Gráfica Web](#-interfaz-gráfica-web)
3. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
4. [Requisitos Previos](#-requisitos-previos)
5. [Instalación y Configuración](#-instalación-y-configuración)
6. [Base de Datos](#-configuración-de-la-base-de-datos)
7. [Documentación de la API](#-documentación-de-endpoints-api)
8. [Guía de Pruebas](#-guía-de-pruebas)
9. [Variables de Entorno](#-variables-de-entorno)
10. [Solución de Problemas](#-solución-de-problemas-comunes)
11. [Contribución](#-contribución)
12. [Licencia y Autores](#-licencia-y-autores)

---

## 🚀 Descripción Detallada

**Task Management API** es una solución backend diseñada para demostrar las mejores prácticas en el desarrollo de servicios REST con el ecosistema Spring. El proyecto implementa una arquitectura en capas limpia y escalable, permitiendo realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre entidades de tareas.

### Arquitectura del Sistema
El proyecto sigue el patrón de diseño **Controller-Service-Repository**:
- **Controller Layer (`com.task.controller`)**: Maneja las solicitudes HTTP y respuestas REST.
- **Service Layer (`com.task.service`)**: Encapsula la lógica de negocio y validaciones.
- **Repository Layer (`com.task.repository`)**: Abstracción de acceso a datos utilizando Spring Data JPA.
- **Model Layer (`com.task.model`)**: Entidades JPA que representan la estructura de datos.

---

## 🎨 Interfaz Gráfica Web

Además de la API REST, el proyecto incluye una **interfaz web moderna y responsive** llamada **TaskFlow** que permite gestionar tareas de forma visual e intuitiva.

### Acceso a la Interfaz

Una vez iniciada la aplicación, accede a la interfaz web en:

```
http://localhost:8080
```

### Características Principales

#### 📊 Dashboard Interactivo

El tablero principal muestra estadísticas en tiempo real:
- **Total de Tareas**: Contador de todas las tareas creadas
- **Tareas Completadas**: Número de tareas finalizadas
- **Tareas Pendientes**: Tareas por completar

![Dashboard Principal](docs/images/ui_main_dashboard.png)

#### ➕ Crear Nuevas Tareas

Interfaz modal para agregar tareas con:
- **Título**: Nombre descriptivo de la tarea
- **Descripción**: Detalles adicionales
- **Prioridad**: Niveles de prioridad (LOW, MEDIUM, HIGH)
- **Estado**: Pendiente o Completada

![Formulario de Creación](docs/images/ui_add_task_form.png)

#### 📋 Visualización de Tareas

Las tareas se muestran como tarjetas interactivas con:
- Indicador visual de estado (círculo toggle)
- Etiqueta de prioridad con código de colores
- Menú de opciones (editar/eliminar)
- Descripción completa

![Lista de Tareas](docs/images/ui_task_list.png)

#### ✅ Cambio de Estado

Toggle rápido para marcar tareas como completadas/pendientes con actualización visual inmediata.

![Toggle de Estado](docs/images/ui_status_toggle.png)

#### ✏️ Editar Tareas

Modal de edición que permite modificar todos los campos de una tarea existente.

![Editar Tarea](docs/images/ui_edit_task.png)

#### 🗑️ Eliminar Tareas

Función de eliminación rápida desde el menú de opciones de cada tarea.

![Eliminar Tarea](docs/images/ui_delete_task.png)

### Tecnologías de la Interfaz

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Motor de Plantillas**: Thymeleaf
- **Diseño**: Responsive con sidebar navigation
- **Estilo**: Sistema de diseño moderno con paleta de colores profesional
- **Interactividad**: Modales, toasts de notificación, animaciones suaves

---

## 🛠 Tecnologías Utilizadas

*   **Lenguaje**: [Java 21](https://www.oracle.com/java/technologies/downloads/#java21) - Última versión LTS con características modernas.
*   **Framework**: [Spring Boot](https://spring.io/projects/spring-boot) - Para configuración rápida y convención sobre configuración.
*   **Base de Datos**: [H2 Database](https://www.h2database.com/) - Base de datos SQL en memoria de alto rendimiento.
*   **ORM**: [Hibernate](https://hibernate.org/) / Spring Data JPA - Para persistencia de datos.
*   **Herramientas de Desarrollo**:
    *   [Maven](https://maven.apache.org/) - Gestión de dependencias y construcción.
    *   [Lombok](https://projectlombok.org/) - Reducción de código boilerplate.

---

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

*   **Java Development Kit (JDK)**: Versión 21 o superior.
    *   Verificar versión: `java -version`
*   **Maven**: Versión 3.8+ (opcional si usas el wrapper incluido `mvnw`).
*   **Git**: Para clonar el repositorio.
*   **Cliente API** (Opcional): Postman, Insomnia o cURL para pruebas manuales.

---

## 📥 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/tu-usuario/task-project.git
    cd task-project
    ```

2.  **Compilar y construir el proyecto**
    Usa el wrapper de Maven para asegurar compatibilidad:
    ```bash
    ./mvnw clean install
    ```
    *(En Windows usa `mvnw.cmd clean install`)*

3.  **Ejecutar la aplicación**
    ```bash
    ./mvnw spring-boot:run
    ```

La aplicación iniciará por defecto en el puerto `8080`.

---

## 💾 Configuración de la Base de Datos

El proyecto utiliza **H2 Database** en modo memoria (`mem`), lo que significa que no necesitas instalar ningún servidor de base de datos externo. Los datos se reinician cada vez que se detiene la aplicación.

### Acceso a la Consola H2
Spring Boot expone una consola web para inspeccionar la base de datos:

1.  Inicia la aplicación.
2.  Abre tu navegador en: `http://localhost:8080/h2-console`
3.  Ingresa los siguientes datos de conexión (definidos en `application.properties`):
    *   **Driver Class**: `org.h2.Driver`
    *   **JDBC URL**: `jdbc:h2:mem:testdb`
    *   **User Name**: `sa`
    *   **Password**: *(dejar vacío)*

### Esquema y Datos
*   El esquema se genera automáticamente gracias a `spring.jpa.hibernate.ddl-auto=update`.
*   Puedes poblar datos iniciales creando un archivo `src/main/resources/data.sql` (opcional).

---

## 📡 Documentación de Endpoints API

La API base URL es: `http://localhost:8080/api/tasks`

### 1. Obtener todas las tareas
*   **Método**: `GET`
*   **Ruta**: `/api/tasks`
*   **Respuesta Exitosa (200 OK)**:
    ```json
    [
      {
        "id": 1,
        "title": "Aprender Spring Boot",
        "description": "Estudiar JPA y controladores REST",
        "completed": false
      }
    ]
    ```

### 2. Obtener una tarea por ID
*   **Método**: `GET`
*   **Ruta**: `/api/tasks/{id}`
*   **Ejemplo**: `/api/tasks/1`
*   **Respuesta Exitosa (200 OK)**: Objeto Task.
*   **Error (404 Not Found)**: Si el ID no existe.

### 3. Crear una nueva tarea
*   **Método**: `POST`
*   **Ruta**: `/api/tasks`
*   **Headers**: `Content-Type: application/json`
*   **Cuerpo de la Petición**:
    ```json
    {
      "title": "Configurar CI/CD",
      "description": "Crear pipeline en GitHub Actions",
      "completed": false
    }
    ```
*   **Validaciones**: El campo `title` es obligatorio.

### 4. Actualizar una tarea
*   **Método**: `PUT`
*   **Ruta**: `/api/tasks/{id}`
*   **Cuerpo de la Petición**:
    ```json
    {
      "title": "Configurar CI/CD Actualizado",
      "description": "Pipeline completado",
      "completed": true
    }
    ```

### 5. Eliminar una tarea
*   **Método**: `DELETE`
*   **Ruta**: `/api/tasks/{id}`
*   **Respuesta Exitosa (204 No Content)**.

---

## 🧪 Guía de Pruebas

### Pruebas Unitarias e Integración
El proyecto incluye pruebas automatizadas con JUnit 5 y Spring Boot Test.

Para ejecutar todas las pruebas:
```bash
./mvnw test
```

### Pruebas Manuales con cURL
Ejemplo para crear una tarea desde la terminal:
```bash
curl -X POST http://localhost:8080/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"Test Task", "description":"Probando API", "completed":false}'
```

---

## ⚙️ Variables de Entorno

Las configuraciones principales se encuentran en `src/main/resources/application.properties`. Puedes sobreescribirlas mediante variables de entorno del sistema o argumentos de línea de comandos.

| Variable | Propiedad Spring | Descripción | Valor por Defecto |
|----------|------------------|-------------|-------------------|
| `SERVER_PORT` | `server.port` | Puerto del servidor | `8080` |
| `SPRING_DATASOURCE_URL` | `spring.datasource.url` | URL de conexión JDBC | `jdbc:h2:mem:testdb` |
| `SPRING_DATASOURCE_USERNAME` | `spring.datasource.username` | Usuario BD | `sa` |

---

## ❓ Solución de Problemas Comunes

**1. Error: "Address already in use"**
*   **Causa**: El puerto 8080 está ocupado por otra aplicación.
*   **Solución**: Detén el proceso que usa el puerto o cambia el puerto de la aplicación:
    ```bash
    ./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
    ```

**2. Error: "Java version mismatch"**
*   **Causa**: Estás intentando ejecutar con una versión de Java inferior a 21.
*   **Solución**: Instala JDK 21 y configura tu variable `JAVA_HOME`.

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor sigue estos pasos:

1.  Haz un Fork del proyecto.
2.  Crea una rama para tu característica (`git checkout -b feature/NuevaCaracteristica`).
3.  Commit de tus cambios (`git commit -m 'Add: Nueva funcionalidad X'`).
4.  Push a la rama (`git push origin feature/NuevaCaracteristica`).
5.  Abre un Pull Request.

---

## 📄 Licencia y Autores

### Licencia
Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

### Autores
*   **Leo Morales** - *Desarrollador Principal*

### Changelog
*   **v0.0.1** - Lanzamiento inicial con funcionalidades CRUD básicas.
