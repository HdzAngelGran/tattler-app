#!/usr/bin/env zsh
# Small helper to run backend and frontend concurrently from the project root.
# Logs are written to ./logs/backend.log and ./logs/frontend.log

set -euo pipefail

LOG_DIR="$(dirname "$0")/logs"
mkdir -p "$LOG_DIR"

PIDS=()

cd "$(dirname "$0")"

echo "Starting backend..."
(cd backend && npm run start) >"$LOG_DIR/backend.log" 2>&1 &
PIDS+=( $! )
echo "Backend PID: ${PIDS[-1]} (logs: $LOG_DIR/backend.log)"

echo "Starting frontend..."
# Use npm run dev which invokes vite
(cd frontend && npm run dev) >"$LOG_DIR/frontend.log" 2>&1 &
PIDS+=( $! )
echo "Frontend PID: ${PIDS[-1]} (logs: $LOG_DIR/frontend.log)"

cleanup() {
  echo "Stopping services..."
  for pid in "${PIDS[@]}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" || true
    fi
  done
  wait
  echo "Stopped."
}

trap cleanup INT TERM EXIT

echo "Both services started. Tail logs with: tail -f $LOG_DIR/*.log"

wait
