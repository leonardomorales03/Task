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

### ⚠️ Importante en macOS

Si abres Cursor desde el Dock o Spotlight, **no verá** la variable que definiste en la terminal (`.zshrc`). Tienes dos opciones:

**Opción A – Abrir Cursor desde la terminal** (recomendado para que cargue el token):

```bash
cd "/Users/leomorales/Library/Mobile Documents/com~apple~CloudDocs/ProyectosPortafolio/Java/TaskProyect/task"
export GITHUB_PERSONAL_ACCESS_TOKEN="tu_token"
cursor .
# o: open -a Cursor .
```

**Opción B – Script que carga el token y abre Cursor:**

1. Crea un archivo **`.env`** en la raíz del proyecto (está en `.gitignore`) con una sola línea:
   ```bash
   GITHUB_PERSONAL_ACCESS_TOKEN=ghp_tu_token_aqui
   ```
2. En la terminal, desde la carpeta del proyecto:
   ```bash
   chmod +x cursor-con-github.sh
   ./cursor-con-github.sh
   ```
   Así Cursor se abre con el token ya cargado.

---

## Cómo validar que el token está cargando

### 1. Comprobar la variable en la terminal

En la **misma terminal** desde la que vas a abrir Cursor (o donde hiciste `export`):

```bash
# No imprimas el token en pantalla; solo comprueba que está definido
[ -n "$GITHUB_PERSONAL_ACCESS_TOKEN" ] && echo "Token definido (longitud: ${#GITHUB_PERSONAL_ACCESS_TOKEN})" || echo "Token NO definido"
```

Si ves "Token definido" y un número de longitud, en esa shell el token está cargado.

### 2. Comprobar el MCP en Cursor

1. Abre **Cursor Settings** (⌘ + ,) → **Features** → **MCP**.
2. Deberías ver el servidor **"github"** en la lista.
3. Si aparece en verde / "Connected" o sin error, el servidor está cargando. Si ves error de autenticación, el token no está llegando o es incorrecto.

### 3. Probar con el Agente

En el chat del Agente (Composer), escribe por ejemplo:

- *"¿Qué repositorios tengo en GitHub?"*
- *"Dame mi perfil de GitHub"*

Si el MCP responde con tus datos, el token se está usando correctamente. Si pide autenticación o falla, revisa que hayas abierto Cursor desde la terminal con `export GITHUB_PERSONAL_ACCESS_TOKEN` ya definido (o que uses el script de abajo).

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
