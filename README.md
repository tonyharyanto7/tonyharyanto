<div align="center">
  <a href="https://github.com/max1mde/fancy-readme-stats">
    <img 
      src="https://fancy-readme-stats.vercel.app/api/pin-wide/?username=max1mde&repo=portfolio&dark_bg=3&theme=red_rain&footer=Easy%20to%20Deploy%20Portfolio%20Template&title=Next.js%20Portfolio%20Template&description=Free%20open-source%20portfolio%20with%20customizable%20design%2C%0AResponsive%20layout%2C%20animated%20components%2C%20and%20easy%20setup&height=210" 
      alt="Card"
    />
  </a>
</div>


## 🚀 Quick Setup (5 Minutes)

1. [Fork the repository](https://github.com/max1mde/portfolio/fork)
2. Customize [CONFIG.json](CONFIG.json) with your personal information in your repository
3. Deploy to Vercel with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/max1mde/portfolio)

<div align="center">
  <a href="preview.png">
    <img src="preview.png" alt="Preview" />
  </a>
</div>

## 📋 Table of Contents

- [Quick Setup](#-quick-setup-5-minutes)  
- [Features](#-features)  
- [Local Development](#-local-development)  
- [Customization](#-customization)  
- [Deployment](#-deployment)  
- [Contributions](#-contributions)  
- [Important Notes](#%EF%B8%8F-important-notes)  
- [License](#-license)  
- [Credits](#-credits)  

## ✨ Features

- Responsive Next.js portfolio template
- Fully customizable via `CONFIG.json`
- Custom cursor effects
- Animated project cards
- Experience timeline
- Contact form
- Multiple font options
- Smooth animations

## 💻 Local Development

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install
npm run dev
```

## 🛠 Customization

Edit [CONFIG.json](CONFIG.json) to personalize:
- Site metadata
- Profile information
- Experience timeline
- Project cards
- Social links
- Contact form settings
- & More

### Fonts
Change global font in [CONFIG.json](CONFIG.json):
- `roboto`
- `delius`
- `audiowide`

## 🌐 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/max1mde/portfolio)

### Other Platforms
- Ensure Node.js is installed
- Install all dependencies `npm install`
- Build with `npm run build`
- Start with `npm start`

## ⚠️ Important Notes

### Contact Form
**YOU MUST** implement your own contact form logic in [route.js](/src/app/api/contact/route.js). The current implementation is a placeholder.

### Personal Information
Remove or replace **(Please replace these before deployment)**:
- Personal email addresses
- Social media links
- Profile image
- Experience details

### Legal Disclaimer
This template is provided as-is. You are responsible for:
- Implementing contact form logic
- Ensuring GDPR/privacy compliance
- Removing original author's personal information

## 📜 License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE)

## 🤝 Contributions

Contributions are welcome!  
Here's how you can help:

- **Report Issues:** [Open an issue](https://github.com/max1mde/portfolio/issues) for bugs or feature requests.  
- **Contribute Code:**  
  1. Fork the repository.  
  2. Create a branch: `git checkout -b feature/your-feature`.  
  3. Commit using the same message style (e.g., `feat: card hover effect`).  
  4. Push changes and submit a pull request.  
- **Improve Docs:** Update the README or add missing info.  

## 🏆 Credits

### Fonts
Font licenses available in [here](src/app/fonts/licenses/)

### Inspiration & Components
- [Custom Cursor](https://www.michieldb.nl/other/cursors/) by Michiel de Boer (Posy) [License](https://creativecommons.org/licenses/by-nc/4.0/deed.en)
- [Card Hover Effect](https://codepen.io/markmiro/pen/wbqMPa) by Mark Miro (MIT License)
- [Infinity Scrolling](https://codepen.io/kevinpowell/pen/BavVLra) by Kevin (MIT License)

---

**Developed with ❤️ by Maxim**
