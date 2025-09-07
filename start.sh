#!/bin/bash

# Define colors
RED="\033[1;38;5;124m"
GRAY="\033[1;30m"
CYAN="\033[0;36m"
NC="\033[0m" # No Color

# Define port
PORT=53142

# ASCII Art Logo
echo -e "${RED}"
cat << "EOF"
 _____ _   _   ___ ______ _____  _    _ _     _____ _____ _____  ___________
/  ___| | | | / _ \|  _  \  _  || |  | | |   |  _  |  __ \  __ \|  ___| ___ \
\ `--.| |_| |/ /_\ \ | | | | | || |  | | |   | | | | |  \/ |  \/| |__ | |_/ /
 `--. \  _  ||  _  | | | | | | || |/\| | |   | | | | | __| | __ |  __||    /
/\__/ / | | || | | | |/ /\ \_/ /\  /\  / |___\ \_/ / |_\ \ |_\ \| |___| |\ \
\____/\_| |_/\_| |_/___/  \___/  \/  \/\_____/\___/ \____/\____/\____/\_| \_|
EOF

echo -e "${CYAN}                         Creator: ARMed0ps${NC}\n"

# Step 1: Start Python HTTP server in the background
echo -e "${GRAY}[*] Starting Python HTTP server on port $PORT...${NC}"
python3 -m http.server "$PORT" > /dev/null 2>&1 &
PY_PID=$!

# Wait a bit for server to start
sleep 2

# Step 2: Start Cloudflared tunnel in background and log output to temp file
echo -e "${GRAY}[*] Starting Cloudflared tunnel...${NC}"
TMP_LOG=$(mktemp)
cloudflared --url "http://0.0.0.0:$PORT" > "$TMP_LOG" 2>&1 &
CF_PID=$!

# Step 3: Wait for the public URL to appear
echo -e "${GRAY}[*] Waiting for tunnel to be created...${NC}"
for i in {1..20}; do
    PUBLIC_URL=$(grep -oE "https://[a-zA-Z0-9.-]+\.trycloudflare\.com" "$TMP_LOG" | head -n 1)
    if [[ -n "$PUBLIC_URL" ]]; then
        echo -e "${RED}[+] Tunnel live at: ${CYAN}$PUBLIC_URL${NC}"
        break
    fi
    sleep 1
done

if [[ -z "$PUBLIC_URL" ]]; then
    echo -e "${RED}[!] Failed to detect Cloudflared public URL.${NC}"
    kill $PY_PID $CF_PID
    rm -f $TMP_LOG
    exit 1
fi

# Step 4: Keep script alive until Ctrl+C
trap "echo -e '\n${RED}[!] Shutting down...${NC}'; kill $PY_PID $CF_PID; rm -f $TMP_LOG; exit" INT
wait
