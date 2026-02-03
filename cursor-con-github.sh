#!/usr/bin/env bash
# Abre Cursor con GITHUB_PERSONAL_ACCESS_TOKEN cargado para el MCP de GitHub.
# Uso: ./cursor-con-github.sh
# Requiere: crear archivo .env en este directorio con la línea:
#   GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxx...

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

if [ -z "$GITHUB_PERSONAL_ACCESS_TOKEN" ]; then
  echo "No se encontró GITHUB_PERSONAL_ACCESS_TOKEN."
  echo "Crea un archivo .env aquí con: GITHUB_PERSONAL_ACCESS_TOKEN=tu_token"
  exit 1
fi

echo "Token cargado (longitud: ${#GITHUB_PERSONAL_ACCESS_TOKEN}). Abriendo Cursor..."
cursor . 2>/dev/null || open -a "Cursor" .
