# Deployment Guide - Anish Dashboard

## 🌐 Hosting Options

The Anish Dashboard is a static web application that can be deployed anywhere. Choose the option that works best for you.

---

## 1. GitHub Pages (Free, Easiest)

### Steps:
1. Create a GitHub account (if you don't have one)
2. Create a new public repository named `anish-dashboard`
3. Push your files to the repository
4. Enable GitHub Pages:
   - Go to Settings → Pages
   - Source: Deploy from branch → `main`
   - Click Save
5. Your dashboard will be live at: `https://yourusername.github.io/anish-dashboard`

### Command Line:
```bash
cd /path/to/Anish-Dashboard
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/anish-dashboard.git
git push -u origin main
```

---

## 2. Netlify (Free, Easy)

### Option A: Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Drag and drop your project folder
4. Netlify automatically deploys
5. Get a URL like: `https://your-site-name.netlify.app`

### Option B: GitHub Integration
1. Push to GitHub (see GitHub Pages)
2. Connect Netlify to your GitHub account
3. Select your repository
4. Netlify auto-deploys on every push

---

## 3. Vercel (Free)

### Steps:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Click Deploy
5. Your site is live immediately

---

## 4. Self-Hosted (Your Own Server)

### Using a VPS (DigitalOcean, Linode, AWS, etc.):

```bash
# 1. SSH into your server
ssh root@your-server-ip

# 2. Install a web server (nginx)
apt update && apt install nginx

# 3. Navigate to web root
cd /var/www/

# 4. Clone your repository (or upload files)
git clone https://github.com/yourusername/anish-dashboard.git
# or
# scp -r /path/to/Anish-Dashboard root@your-server-ip:/var/www/

# 5. Create nginx config
sudo nano /etc/nginx/sites-available/dashboard
```

**Nginx Configuration** (`/etc/nginx/sites-available/dashboard`):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/anish-dashboard;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Using Docker:

Create `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t anish-dashboard .
docker run -p 80:80 anish-dashboard
```

---

## 5. Local Network (Home/Office)

### Share on local network:

```bash
# Python 3
cd /path/to/Anish-Dashboard
python3 -m http.server 8000

# Then access from other devices:
# http://your-computer-ip:8000
```

Find your IP:
- **Mac/Linux**: `ifconfig` (look for inet address)
- **Windows**: `ipconfig` (look for IPv4 Address)

---

## 📋 Pre-Deployment Checklist

- [ ] All files included (HTML, CSS, JS, assets)
- [ ] Links are relative (not absolute paths)
- [ ] HTTPS enabled (for security)
- [ ] Test in multiple browsers
- [ ] Test on mobile devices
- [ ] Data privacy policy (if applicable)
- [ ] Backup of important data

---

## 🔒 Security Considerations

### HTTPS
Always use HTTPS if deploying publicly:
- GitHub Pages: Automatic ✓
- Netlify: Automatic ✓
- Vercel: Automatic ✓
- Self-hosted: Use Let's Encrypt (free)

### Data Privacy
- All data stored locally in browser
- No server communication
- No tracking or analytics by default
- Consider adding privacy policy

### Updates
Keep your deployment up to date:
- Regularly push code changes
- Test thoroughly before deploying
- Monitor for any issues

---

## 🚀 Performance Optimization

### For Faster Loading:

1. **Enable gzip compression** (nginx/server)
2. **Use browser caching** headers
3. **Minify CSS/JS** (optional, for production)
4. **Optimize images** in assets folder

### Tools:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

---

## 📊 Monitoring & Logging

### GitHub Pages
- Check deployment status in repository "Actions" tab

### Netlify
- View logs in Netlify dashboard
- Get notifications on build failures

### Vercel
- Dashboard shows deployment history
- Performance analytics included

### Self-Hosted
- Check server error logs
- Monitor disk space
- Monitor CPU/memory usage

---

## 🔄 Updating Your Deployment

### After Making Changes:

**GitHub/Git-based (GitHub Pages, Netlify, Vercel):**
```bash
git add .
git commit -m "Update: [description]"
git push
# Automatic deployment starts
```

**Netlify Drag & Drop:**
- Simply drag and drop updated folder again

**Self-Hosted:**
```bash
# Pull latest changes
cd /path/to/deployment
git pull
# Or manually upload new files via SFTP
```

---

## 🆘 Troubleshooting

### "404 - File Not Found"
- Verify all files are uploaded
- Check file paths in HTML
- Ensure index.html is in root

### "Resources not loading"
- Check CSS/JS paths are relative
- Verify file permissions (755 for directories, 644 for files)
- Check browser console for specific errors

### "Can't access from other devices"
- Ensure firewall allows traffic
- Check your router settings
- Use correct IP address and port

### "GitHub Pages not updating"
- Wait 1-2 minutes for deployment
- Check "Actions" tab for build errors
- Clear browser cache (Cmd+Shift+R)

---

## 📚 Useful Commands

### Check if port is available:
```bash
# Linux/Mac
lsof -i :8000

# Windows
netstat -ano | findstr :8000
```

### Kill process on port:
```bash
# Linux/Mac
kill -9 <PID>

# Windows
taskkill /PID <PID> /F
```

### Serve locally with Python:
```bash
python3 -m http.server 8000
```

### Serve locally with Node:
```bash
npx http-server
```

---

## 🎯 Recommended Setup

**For Personal Use:**
→ Local hosting with Python/Node or GitHub Pages

**For Small Team:**
→ GitHub Pages + GitHub repository or Netlify

**For Production:**
→ Self-hosted on VPS + domain + HTTPS + backups

---

## 📞 Support Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt for HTTPS](https://letsencrypt.org/)

---

**Happy deploying!** 🚀
