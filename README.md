
# CortexCart 🚀

**Unlock valuable insights into your customer's purchasing and Browse behavior with CortexCart!** This AI-powered dashboard uses a simple JavaScript snippet that can be easily integrated into any website. CortexCart empowers you to take actionable steps to improve sales, enhance usability, and boost product discoverability in real-time.
**Beta v0.9.0 Version** This Beta version is available to contribute to and download and use as is, we do reserve the right to pull this access and make the application private after beta testing and the app is released from Beta to v1.0 Stable. We will announce this here on github and our website cortexcart.com/release.
---

## Features ✨

* **AI-Powered Insights:** Leverage the power of artificial intelligence to understand complex customer behavior patterns.
* **Simple JavaScript Integration:** Get up and running quickly by adding a single line of JavaScript to your website. No complex setup required!
* **Comprehensive Dashboard:** Visualize key metrics and trends related to customer purchasing and Browse habits.
* **Actionable Recommendations:** Receive data-driven suggestions to optimize your sales funnel and user experience.
* **Real-time Monitoring:** Track changes as they happen and make immediate adjustments to improve usability and discoverability.
* **Boost Sales:** Identify opportunities to increase conversion rates and average order value.
* **Enhance User Experience:** Understand how users interact with your site to remove friction points and improve navigation.
* **Improve Discoverability:** Uncover how customers find products and optimize pathways to key items.

---

## Installation 🛠️

CortexCart can be installed on Linux servers (Ubuntu 22.04 LTS / CentOS 7+) using our automated installer script. Choose one of the installation methods below:

### Method 1: Direct Download Installation (Recommended)

**One-line installation:**
```bash
curl -fsSL https://cortexcart.com/beta/downloads/install-cortexcart.sh | sudo bash
```

**Or download and inspect before running:**
```bash
# Download the installer
wget https://cortexcart.com/beta/downloads/install-cortexcart.sh

# Make it executable
chmod +x install-cortexcart.sh

# Review the script (optional but recommended)
cat install-cortexcart.sh

# Run the installer
sudo ./install-cortexcart.sh
```

### Method 2: GitHub Installation

**Clone and install from GitHub:**
```bash
# Clone the repository
git clone https://github.com/bespokedesignservices/cortexcart-insight-dashboard.git

# Navigate to the project directory
cd cortexcart-insight-dashboard

# Make the installer executable
chmod +x install-cortexcart.sh

# Run the installer
sudo ./install-cortexcart.sh
```

### System Requirements

- **Operating System:** Ubuntu 22.04 LTS or CentOS 7+
- **Memory:** Minimum 2GB RAM (4GB recommended)
- **Storage:** At least 5GB free space
- **Network:** Internet connection for downloading dependencies
- **Privileges:** Root access (sudo) required for installation

### Technology Stack

The installer automatically sets up:
- **Frontend:** React/TypeScript application built with Vite
- **Runtime:** Node.js 18.x
- **Web Server:** Nginx
- **Backend:** Supabase for backend services
- **Process Management:** systemd

### Post-Installation Configuration

After installation completes:

1. **Configure Environment Variables:**
   Edit `/opt/cortexcart/app/.env` with your settings:
   ```bash
   sudo nano /opt/cortexcart/app/.env
   ```
   
   Update these required fields:
   ```env
   APP_DOMAIN=your-domain.com
   APP_URL=https://your-domain.com
   ADMIN_EMAIL=admin@your-domain.com
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```

2. **Update Nginx Configuration:**
   Edit the server name in `/etc/nginx/sites-available/cortexcart`:
   ```bash
   sudo nano /etc/nginx/sites-available/cortexcart
   ```
   
   Change `server_name _;` to `server_name your-domain.com;`

3. **Restart Services:**
   ```bash
   sudo systemctl restart cortexcart nginx
   ```

4. **Verify Installation:**
   ```bash
   # Check service status
   sudo systemctl status cortexcart
   
   # View application logs
   sudo journalctl -u cortexcart -f
   ```

### Service Management

**Common service commands:**
```bash
# Check status
sudo systemctl status cortexcart

# Start service
sudo systemctl start cortexcart

# Stop service
sudo systemctl stop cortexcart

# Restart service
sudo systemctl restart cortexcart

# View logs
sudo journalctl -u cortexcart -f
```

### Firewall Configuration

The installer automatically configures firewall rules for:
- Port 22 (SSH)
- Port 80 (HTTP)
- Port 443 (HTTPS)

### SSL/TLS Setup (Recommended)

For production use, set up SSL certificates:

**Using Let's Encrypt (free):**
```bash
# Install certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal (optional)
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## How It Works ⚙️

1.  **Sign Up:** Create your CortexCart account.
2.  **Integrate:** Copy the provided JavaScript snippet and paste it into the `<head>` or `<body>` section of your website's HTML.
3.  **Collect Data:** The script securely and anonymously tracks relevant user interactions (e.g., page views, clicks, add-to-carts, purchases).
4.  **Analyze & Visualize:** Our AI algorithms process this data and present it in an intuitive dashboard.
5.  **Take Action:** Use the insights and recommendations to make informed decisions and improve your website's performance.

---

## Screen Shots ##
## Onboarding landing page ##
<img width="1426" alt="Screenshot 2025-06-01 at 06 27 25" src="https://github.com/user-attachments/assets/4be0d33c-a317-4a7e-ad5f-ff9f66fe6ad3" />

<img width="1445" alt="Screenshot 2025-06-01 at 06 28 45" src="https://github.com/user-attachments/assets/068277ee-c791-4f27-9ba0-0d77a4e98206" />

<img width="1441" alt="Screenshot 2025-06-01 at 06 31 07" src="https://github.com/user-attachments/assets/6a0210c3-3ab5-41dc-b303-b880ede9dfa0" />

---

## Getting Started 🏁

1.  **Install CortexCart:** Use one of the installation methods above to set up your server.
2.  **Configure Environment:** Update your `.env` file with Supabase credentials and domain settings.
3.  **Sign up for a CortexCart account:** Visit your installed instance to create an account.
4.  **Retrieve your unique JavaScript snippet:** You'll find this in your CortexCart dashboard after signing up.
5.  **Add the snippet to your website:**
    ```html
    <script async src="[Your Unique CortexCart Script URL Here]"></script>
    ```
6.  **Log in to your CortexCart dashboard** to start seeing insights once data collection begins!

---

## Troubleshooting 🔧

### Common Issues

**Installation fails:**
- Ensure you have root/sudo access
- Check internet connectivity
- Verify system requirements are met

**Service won't start:**
```bash
# Check logs for errors
sudo journalctl -u cortexcart --no-pager

# Verify configuration
sudo nginx -t
```

**Can't access dashboard:**
- Check firewall settings
- Verify Nginx is running: `sudo systemctl status nginx`
- Check domain/DNS configuration

### Log Locations

- **Installation Log:** `/var/log/cortexcart/install_YYYYMMDD-HHMMSS.log`
- **Application Logs:** `sudo journalctl -u cortexcart`
- **Nginx Logs:** `/var/log/nginx/access.log` and `/var/log/nginx/error.log`

---

## Contributing 🤝

We welcome contributions to make CortexCart even better! If you'd like to contribute, please:

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

---

## Support 💬

If you have any questions or encounter any issues, please:

- Open an issue on this GitHub repository
- Contact us at jonathanservice@hotmail.com
- Check the troubleshooting section above

---

## License 📄

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

---

**Start understanding your customers better and supercharge your sales with CortexCart today!**
