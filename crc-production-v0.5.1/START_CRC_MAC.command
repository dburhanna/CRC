#!/bin/bash
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install Node.js 22 LTS or newer, then run this file again."
  read -r -p "Press Enter to close..."
  exit 1
fi
if [ ! -d node_modules ]; then
  echo "First run: installing CRC dependencies..."
  npm install || exit 1
fi
echo "Starting Curriculum Reality Check..."
echo "Open http://localhost:3000 in your browser if it does not open automatically."
npm run dev
