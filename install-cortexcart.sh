
#!/bin/bash

#################################################
# CortexCart v.0.9.0-beta Linux Installer Script
#################################################
#
# This script automates the complete installation of CortexCart
# on Linux servers (Ubuntu 22.04 LTS / CentOS 7+)
#
# Technology Stack Assumptions:
# - React/TypeScript application built with Vite
# - Node.js 18.x runtime
# - Nginx as web server
# - Supabase for backend services
# - systemd for service management
#
# Usage: sudo bash install-cortexcart.sh
#
# Author: CortexCart Team
# Version: 0.9.0-beta
#################################################

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Configuration Variables
readonly CORTEXCART_VERSION="0.9.0-beta"
readonly APP_NAME="CortexCart"
readonly APP_USER="cortexcart"
readonly APP_DIR="/opt/cortexcart"
readonly LOG_DIR="/var/log/cortexcart"
readonly SERVICE_NAME="cortexcart"
readonly NGINX_SITE="cortexcart"
readonly NODE_VERSION="18"
readonly APP_PORT="3000"

# Repository and download URLs
readonly GIT_REPO="https://github.com/bespokedesignservices/cortexcart-insight-dashboard.git"
readonly INSTALL_LOG="${LOG_DIR}/install_$(date +%Y%m%d-%H%M%S).log"

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

#################################################
# Utility Functions
#################################################

log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case $level in
        INFO)  echo -e "${GREEN}[INFO]${NC} $message" ;;
        WARN)  echo -e "${YELLOW}[WARN]${NC} $message" ;;
        ERROR) echo -e "${RED}[ERROR]${NC} $message" ;;
        DEBUG) echo -e "${BLUE}[DEBUG]${NC} $message" ;;
    esac
    
    echo "[$timestamp] [$level] $message" >> "$INSTALL_LOG" 2>/dev/null || true
}

error_exit() {
    log ERROR "$1"
    log ERROR "Installation failed. Check the log file: $INSTALL_LOG"
    exit 1
}

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

detect_os() {
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        OS=$NAME
        VER=$VERSION_ID
    elif command_exists lsb_release; then
        OS=$(lsb_release -si)
        VER=$(lsb_release -sr)
    else
        error_exit "Cannot detect operating system"
    fi
    
    log INFO "Detected OS: $OS $VER"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        error_exit "This script must be run as root (use sudo)"
    fi
}

create_directories() {
    log INFO "Creating application directories..."
    
    mkdir -p "$APP_DIR" "$LOG_DIR"
    chown root:root "$APP_DIR" "$LOG_DIR"
    chmod 755 "$APP_DIR" "$LOG_DIR"
    
    # Ensure log file exists and is writable
    touch "$INSTALL_LOG"
    chmod 644 "$INSTALL_LOG"
}

#################################################
# System Package Installation
#################################################

install_base_packages() {
    log INFO "Installing base system packages..."
    
    case "$OS" in
        *"Ubuntu"*|*"Debian"*)
            apt-get update -y
            apt-get install -y \
                curl \
                wget \
                git \
                unzip \
                build-essential \
                software-properties-common \
                apt-transport-https \
                ca-certificates \
                gnupg \
                lsb-release
            ;;
        *"CentOS"*|*"Red Hat"*|*"Rocky"*|*"AlmaLinux"*)
            yum update -y
            yum groupinstall -y "Development Tools"
            yum install -y \
                curl \
                wget \
                git \
                unzip \
                epel-release
            ;;
        *)
            error_exit "Unsupported operating system: $OS"
            ;;
    esac
}

install_nodejs() {
    log INFO "Installing Node.js $NODE_VERSION..."
    
    if command_exists node; then
        local current_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [[ "$current_version" -eq "$NODE_VERSION" ]]; then
            log INFO "Node.js $NODE_VERSION is already installed"
            return 0
        fi
    fi
    
    case "$OS" in
        *"Ubuntu"*|*"Debian"*)
            curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
            apt-get install -y nodejs
            ;;
        *"CentOS"*|*"Red Hat"*|*"Rocky"*|*"AlmaLinux"*)
            curl -fsSL https://rpm.nodesource.com/setup_${NODE_VERSION}.x | bash -
            yum install -y nodejs
            ;;
    esac
    
    # Verify installation
    node --version || error_exit "Node.js installation failed"
    npm --version || error_exit "npm installation failed"
    
    log INFO "Node.js $(node --version) installed successfully"
}

install_nginx() {
    log INFO "Installing and configuring Nginx..."
    
    case "$OS" in
        *"Ubuntu"*|*"Debian"*)
            apt-get install -y nginx
            ;;
        *"CentOS"*|*"Red Hat"*|*"Rocky"*|*"AlmaLinux"*)
            yum install -y nginx
            ;;
    esac
    
    # Enable and start Nginx
    systemctl enable nginx
    systemctl start nginx || error_exit "Failed to start Nginx"
    
    log INFO "Nginx installed and started successfully"
}

#################################################
# User Management
#################################################

create_app_user() {
    log INFO "Creating application user: $APP_USER"
    
    if id "$APP_USER" &>/dev/null; then
        log INFO "User $APP_USER already exists"
        return 0
    fi
    
    useradd --system --shell /bin/false --home-dir "$APP_DIR" --create-home "$APP_USER"
    log INFO "Created system user: $APP_USER"
}

#################################################
# Application Installation
#################################################

download_application() {
    log INFO "Downloading CortexCart application from repository..."
    
    # Remove existing directory if it exists
    if [[ -d "$APP_DIR/app" ]]; then
        rm -rf "$APP_DIR/app"
    fi
    
    # Clone the repository
    git clone "$GIT_REPO" "$APP_DIR/app" || error_exit "Failed to clone repository"
    
    # Set ownership
    chown -R "$APP_USER:$APP_USER" "$APP_DIR/app"
    
    log INFO "Application source code downloaded successfully"
}

install_dependencies() {
    log INFO "Installing application dependencies..."
    
    cd "$APP_DIR/app"
    
    # Install npm dependencies
    sudo -u "$APP_USER" npm ci --production || error_exit "Failed to install npm dependencies"
    
    log INFO "Dependencies installed successfully"
}

build_application() {
    log INFO "Building CortexCart application..."
    
    cd "$APP_DIR/app"
    
    # Build the application
    sudo -u "$APP_USER" npm run build || error_exit "Failed to build application"
    
    log INFO "Application built successfully"
}

configure_application() {
    log INFO "Configuring CortexCart application..."
    
    cd "$APP_DIR/app"
    
    # Create environment configuration
    cat > .env << EOF
# CortexCart Configuration
# Generated by installer on $(date)

# Application Settings
NODE_ENV=production
PORT=$APP_PORT
APP_NAME="$APP_NAME"
APP_VERSION="$CORTEXCART_VERSION"

# Domain Configuration (EDIT THESE VALUES)
APP_DOMAIN=[YOUR_DOMAIN_HERE]
APP_URL=http://[YOUR_DOMAIN_HERE]

# Admin Configuration (EDIT THESE VALUES)
ADMIN_EMAIL=[ADMIN_EMAIL_HERE]

# Supabase Configuration (EDIT THESE VALUES)
VITE_SUPABASE_URL=[YOUR_SUPABASE_URL]
VITE_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR_SUPABASE_SERVICE_ROLE_KEY]

# Security
SESSION_SECRET=$(openssl rand -hex 32)

# Logging
LOG_LEVEL=info
LOG_DIR=$LOG_DIR
EOF
    
    chown "$APP_USER:$APP_USER" .env
    chmod 600 .env
    
    log INFO "Environment configuration created at $APP_DIR/app/.env"
    log WARN "Please edit $APP_DIR/app/.env with your Supabase credentials and domain settings"
}

#################################################
# Service Configuration
#################################################

create_systemd_service() {
    log INFO "Creating systemd service for CortexCart..."
    
    cat > "/etc/systemd/system/${SERVICE_NAME}.service" << EOF
[Unit]
Description=CortexCart v.${CORTEXCART_VERSION} - AI-Powered E-commerce Analytics
Documentation=https://github.com/bespokedesignservices/cortexcart-insight-dashboard
After=network.target
Wants=network.target

[Service]
Type=simple
User=$APP_USER
Group=$APP_USER
WorkingDirectory=$APP_DIR/app
Environment=NODE_ENV=production
EnvironmentFile=$APP_DIR/app/.env
ExecStart=/usr/bin/npm start
ExecReload=/bin/kill -HUP \$MAINPID
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=$SERVICE_NAME

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$APP_DIR $LOG_DIR

[Install]
WantedBy=multi-user.target
EOF
    
    # Reload systemd and enable service
    systemctl daemon-reload
    systemctl enable "$SERVICE_NAME"
    
    log INFO "Systemd service created and enabled"
}

configure_nginx() {
    log INFO "Configuring Nginx virtual host..."
    
    # Create Nginx site configuration
    cat > "/etc/nginx/sites-available/$NGINX_SITE" << EOF
server {
    listen 80;
    server_name _;  # Change this to your domain
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Serve static files from build directory
    location / {
        root $APP_DIR/app/dist;
        try_files \$uri \$uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Proxy API requests to the application
    location /api {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Proxy Supabase functions
    location /functions {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
EOF
    
    # Enable the site
    if [[ -d /etc/nginx/sites-enabled ]]; then
        ln -sf "/etc/nginx/sites-available/$NGINX_SITE" "/etc/nginx/sites-enabled/$NGINX_SITE"
        # Remove default site if it exists
        rm -f /etc/nginx/sites-enabled/default
    else
        # For CentOS/RHEL, include the config directly
        echo "include /etc/nginx/sites-available/$NGINX_SITE;" >> /etc/nginx/nginx.conf
    fi
    
    # Test Nginx configuration
    nginx -t || error_exit "Nginx configuration test failed"
    
    # Reload Nginx
    systemctl reload nginx
    
    log INFO "Nginx virtual host configured successfully"
}

#################################################
# Firewall Configuration
#################################################

configure_firewall() {
    log INFO "Configuring firewall rules..."
    
    if command_exists ufw; then
        # Ubuntu/Debian - UFW
        ufw --force enable
        ufw allow 22/tcp   # SSH
        ufw allow 80/tcp   # HTTP
        ufw allow 443/tcp  # HTTPS
        log INFO "UFW firewall configured"
    elif command_exists firewall-cmd; then
        # CentOS/RHEL - firewalld
        systemctl enable firewalld
        systemctl start firewalld
        firewall-cmd --permanent --add-service=ssh
        firewall-cmd --permanent --add-service=http
        firewall-cmd --permanent --add-service=https
        firewall-cmd --reload
        log INFO "firewalld configured"
    else
        log WARN "No supported firewall found. Please configure manually."
    fi
}

#################################################
# Service Management
#################################################

start_services() {
    log INFO "Starting CortexCart services..."
    
    # Start the application service
    systemctl start "$SERVICE_NAME" || error_exit "Failed to start $SERVICE_NAME service"
    
    # Wait a moment for the service to initialize
    sleep 5
    
    # Check if service is running
    if systemctl is-active --quiet "$SERVICE_NAME"; then
        log INFO "CortexCart service started successfully"
    else
        error_exit "CortexCart service failed to start. Check: sudo journalctl -u $SERVICE_NAME"
    fi
}

#################################################
# Validation
#################################################

validate_installation() {
    log INFO "Validating installation..."
    
    # Check if service is running
    systemctl is-active --quiet "$SERVICE_NAME" || error_exit "CortexCart service is not running"
    
    # Check if Nginx is running
    systemctl is-active --quiet nginx || error_exit "Nginx service is not running"
    
    # Check if application responds
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -f -s "http://localhost:$APP_PORT" > /dev/null 2>&1; then
            log INFO "Application is responding on port $APP_PORT"
            break
        fi
        
        if [[ $attempt -eq $max_attempts ]]; then
            error_exit "Application is not responding after $max_attempts attempts"
        fi
        
        log DEBUG "Waiting for application to start (attempt $attempt/$max_attempts)..."
        sleep 2
        ((attempt++))
    done
    
    log INFO "Installation validation completed successfully"
}

#################################################
# Cleanup and Final Steps
#################################################

perform_cleanup() {
    log INFO "Performing cleanup..."
    
    # Set final permissions
    chown -R "$APP_USER:$APP_USER" "$APP_DIR"
    chmod -R 755 "$APP_DIR"
    chmod 600 "$APP_DIR/app/.env"
    
    # Clean package manager cache
    case "$OS" in
        *"Ubuntu"*|*"Debian"*)
            apt-get autoremove -y
            apt-get autoclean
            ;;
        *"CentOS"*|*"Red Hat"*|*"Rocky"*|*"AlmaLinux"*)
            yum clean all
            ;;
    esac
    
    log INFO "Cleanup completed"
}

display_final_summary() {
    local server_ip=$(hostname -I | awk '{print $1}')
    
    echo
    echo "=========================================================="
    echo -e "${GREEN}🚀 CortexCart v.${CORTEXCART_VERSION} Installation Complete!${NC}"
    echo "=========================================================="
    echo
    echo -e "${BLUE}📊 Application Details:${NC}"
    echo "   Application Name: $APP_NAME"
    echo "   Version: $CORTEXCART_VERSION"
    echo "   Installation Directory: $APP_DIR/app"
    echo "   Application User: $APP_USER"
    echo
    echo -e "${BLUE}🌐 Access Information:${NC}"
    echo "   Web Interface: http://$server_ip"
    echo "   Internal Port: $APP_PORT"
    echo
    echo -e "${BLUE}📁 Important File Locations:${NC}"
    echo "   Application Config: $APP_DIR/app/.env"
    echo "   Nginx Config: /etc/nginx/sites-available/$NGINX_SITE"
    echo "   Service File: /etc/systemd/system/${SERVICE_NAME}.service"
    echo "   Installation Log: $INSTALL_LOG"
    echo "   Application Logs: sudo journalctl -u $SERVICE_NAME"
    echo
    echo -e "${BLUE}🔧 Service Management Commands:${NC}"
    echo "   Check Status: sudo systemctl status $SERVICE_NAME"
    echo "   Start Service: sudo systemctl start $SERVICE_NAME"
    echo "   Stop Service: sudo systemctl stop $SERVICE_NAME"
    echo "   Restart Service: sudo systemctl restart $SERVICE_NAME"
    echo "   View Logs: sudo journalctl -u $SERVICE_NAME -f"
    echo
    echo -e "${YELLOW}⚠️  Important Next Steps:${NC}"
    echo "   1. Edit $APP_DIR/app/.env with your Supabase credentials"
    echo "   2. Update the Nginx server_name in /etc/nginx/sites-available/$NGINX_SITE"
    echo "   3. Restart services after configuration: sudo systemctl restart $SERVICE_NAME nginx"
    echo "   4. Consider setting up SSL/TLS certificates for production use"
    echo
    echo -e "${GREEN}✅ Installation completed successfully!${NC}"
    echo "=========================================================="
    echo
}

#################################################
# Main Installation Flow
#################################################

main() {
    echo "=========================================================="
    echo -e "${BLUE}🚀 CortexCart v.${CORTEXCART_VERSION} Linux Installer${NC}"
    echo "=========================================================="
    echo
    echo "Starting automated installation..."
    echo
    
    # Pre-installation checks
    check_root
    detect_os
    create_directories
    
    log INFO "Starting CortexCart v.${CORTEXCART_VERSION} installation"
    
    # Core installation steps
    install_base_packages
    install_nodejs
    install_nginx
    create_app_user
    
    # Application setup
    download_application
    install_dependencies
    build_application
    configure_application
    
    # Service configuration
    create_systemd_service
    configure_nginx
    configure_firewall
    
    # Start and validate
    start_services
    validate_installation
    
    # Finalization
    perform_cleanup
    display_final_summary
    
    log INFO "CortexCart v.${CORTEXCART_VERSION} installation completed successfully"
}

#################################################
# Script Execution
#################################################

# Trap errors and cleanup
trap 'error_exit "Installation interrupted"' INT TERM

# Run main installation
main "$@"

exit 0
