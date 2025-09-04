#!/bin/bash

PORT=53142

# Step 1: Start Python HTTP server in the background
echo "[*] Starting Python HTTP server on port $PORT..."
python3 -m http.server "$PORT" > /dev/null 2>&1 &
PY_PID=$!

# Wait a bit for server to start
sleep 2

# Step 2: Start Cloudflared tunnel in background and log output to temp file
echo "[*] Starting Cloudflared tunnel..."
TMP_LOG=$(mktemp)
cloudflared --url "http://0.0.0.0:$PORT" > "$TMP_LOG" 2>&1 &
CF_PID=$!

# Step 3: Wait for the public URL to appear
echo "[*] Waiting for tunnel to be created..."
for i in {1..20}; do
    PUBLIC_URL=$(grep -oE "https://[a-zA-Z0-9.-]+\.trycloudflare\.com" "$TMP_LOG" | head -n 1)
    if [[ -n "$PUBLIC_URL" ]]; then
        echo "[+] Tunnel live at: $PUBLIC_URL"
        break
    fi
    sleep 1
done

if [[ -z "$PUBLIC_URL" ]]; then
    echo "[!] Failed to detect Cloudflared public URL."
    kill $PY_PID $CF_PID
    exit 1
fi

# Step 4: Keep script alive until Ctrl+C
trap "echo -e '\n[!] Shutting down...'; kill $PY_PID $CF_PID; rm -f $TMP_LOG; exit" INT
wait
