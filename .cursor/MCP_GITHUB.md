# Configuración de GitHub MCP y subida a GitHub

## 1. GitHub MCP (ya configurado)

El archivo `.cursor/mcp.json` ya tiene el servidor **GitHub MCP** configurado (remoto). Solo falta el token.

### Crear un Personal Access Token (PAT)

1. Entra en **GitHub** → **Settings** → **Developer settings** → [Personal access tokens](https://github.com/settings/tokens).
2. **Tokens (classic)** → **Generate new token (classic)**.
3. Pon un nombre (ej: `Cursor MCP`) y marca al menos el scope **`repo`** (acceso a repositorios).
4. Genera el token y **cópialo** (solo se muestra una vez).

### Definir la variable de entorno

En la terminal (o en `~/.zshrc` para que sea permanente):

```bash
export GITHUB_PERSONAL_ACCESS_TOKEN="tu_token_aqui"
```

Sustituye `tu_token_aqui` por el token que generaste.

### Activar el MCP en Cursor

1. Cierra y vuelve a abrir Cursor (o recarga la ventana).
2. El servidor **github** debería aparecer en **Settings** → **Features** → **MCP**.
3. En el chat con el Agente podrás pedir cosas como: crear repos, issues, PRs, buscar código, etc.

---

## 2. Subir este proyecto a GitHub (con Git)

El MCP no sube el código por ti; eso se hace con **git**. Pasos:

### Si aún no tienes repositorio en GitHub

1. En [GitHub](https://github.com/new) crea un repositorio nuevo (ej: `task`).
2. No marques “Add a README” si vas a subir este proyecto.

### En la carpeta del proyecto

```bash
cd "/ruta/al/proyecto/task"

# Inicializar git (si no está ya)
git init

# Añadir todo y primer commit
git add .
git commit -m "Initial commit: Spring Boot Task API"

# Añadir el remoto (sustituye TU_USUARIO y TU_REPO por los tuyos)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git

# Subir (rama main)
git branch -M main
git push -u origin main
```

Si GitHub te pide autenticación, usa el mismo **Personal Access Token** como contraseña (o configura SSH).

---

Resumen: **MCP** = que el asistente de Cursor pueda usar GitHub (repos, issues, PRs). **Git + push** = subir este código a un repo en GitHub.
