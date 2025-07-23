# 🎫 AI Ticket Assistant - Frontend

Modern, AI destekli ticket yönetim sistemi arayüzü. React ile geliştirilmiş, kullanıcı dostu interface.

## 🌐 **Canlı Demo**

- **🚀 Frontend (Vercel):** [https://ai-ticket-frontend-green.vercel.app](https://ai-ticket-frontend-green.vercel.app)
- **⚙️ Backend API (Render):** [https://ai-ticket-backend-gv7o.onrender.com](https://ai-ticket-backend-gv7o.onrender.com)

> **Not:** İlk kullanımda backend soğuk başlatma nedeniyle 30-60 saniye sürebilir.

## ✨ Özellikler

- 🎨 **Modern UI/UX** - TailwindCSS + DaisyUI
- 🔐 **Güvenli Kimlik Doğrulama**
- 🎫 **Akıllı Ticket Yönetimi**
- 🤖 **AI Analiz Sonuçları** - Gemini AI'dan gelen öneriler
- 👥 **Rol Bazlı Erişim** (User, Moderator, Admin)
- 📱 **Responsive Tasarım**
- 🌐 **Türkçe Arayüz**
- ⚡ **Hızlı Performans**

## 🛠️ Teknolojiler

- **React 18**
- **Vite** (Build tool)
- **React Router DOM** (Routing)
- **TailwindCSS** (Styling)
- **DaisyUI** (UI Components)
- **React Markdown** (Markdown rendering)

## 🚀 Kurulum

### 1. Proje Klonlama

```bash
git clone <repository-url>
cd ai-ticket-frontend
```

### 2. Bağımlılıkları Yükleme

```bash
npm install
```

### 3. Environment Konfigürasyonu

Eğer API URL'i değiştirmek istiyorsanız, `src` klasöründeki fetch URL'lerini güncelleyin.

Varsayılan backend URL: `http://localhost:3000`

### 4. Development Serveri

```bash
npm run dev
```

### 5. Production Build

```bash
npm run build
```

### 6. Build Preview

```bash
npm run preview
```

## 📱 Sayfalar & Özellikler

### 🏠 **Anasayfa (Dashboard)**

- Kullanıcı profil bilgileri
- Hızlı işlem butonları
- Ticket özeti kartları
- Sistem durumu

### 🔐 **Kimlik Doğrulama**

- **Giriş**: Email/Password
- **Kayıt**: Email, Password, Yetenekler
- **Otomatik**: JWT token yönetimi

### 🎫 **Ticket Yönetimi**

- **Ticket Oluşturma**: Başlık, açıklama
- **Ticket Listesi**: Tüm tickets, filtreleme
- **Ticket Detay**: AI analizi, durum güncelleme
- **Durum Yönetimi**: YAPILACAK → İŞLEMDE → TAMAMLANDI

### 👨‍💼 **Admin Paneli** (Sadece Adminler)

- Kullanıcı listesi
- Rol yönetimi
- Yetki düzenleme

## 🎨 UI Bileşenleri

### 🧭 **Navigation**

- Responsive navbar
- Mobil uyumlu menü
- Kullanıcı dropdown
- Rol bazlı menü öğeleri

### 🎪 **Cards & Layouts**

- Modern card tasarımları
- Grid layouts
- Responsive breakpoints
- Loading states

### 🎯 **Forms**

- Validasyon
- Error handling
- Loading states
- User feedback

## 🔄 State Management

- **React useState** - Lokal state yönetimi
- **localStorage** - JWT token persistence
- **useEffect** - Data fetching
- **Context yok** - Basit yapı tercih edildi

## 🌐 API Entegrasyonu

### 🔗 **Endpoints**

```javascript
// Authentication
POST /auth/signup
POST /auth/login
GET /auth/logout
GET /auth/get-user

// Tickets
GET /tickets
GET /tickets/:id
POST /tickets
PUT /tickets/:id/status
```

### 🔐 **Authentication**

```javascript
// JWT token header'da gönderilir
Authorization: Bearer <token>
```

## 📁 Proje Yapısı

```
ai-ticket-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── check-auth.jsx
│   │   └── navbar.jsx
│   ├── pages/           # Page components
│   │   ├── admin.jsx
│   │   ├── dashboard.jsx
│   │   ├── login.jsx
│   │   ├── signup.jsx
│   │   ├── ticket.jsx
│   │   └── tickets.jsx
│   ├── index.css        # Global styles
│   └── main.jsx         # App entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Styling

### **TailwindCSS Classes**

```css
/* Layout */
.container, .max-w-*, .mx-auto

/* Components */
.btn, .card, .input, .textarea

/* States */
.loading, .badge, .alert

/* Colors */
.btn-primary, .btn-success, .btn-error;
```

### **DaisyUI Themes**

- Light/Dark mode desteği
- Consistent color palette
- Ready-to-use components

## 🌐 Deploy (Vercel)

### 1. **Build Ayarları**

```json
{
	"build": {
		"command": "npm run build",
		"outputDirectory": "dist"
	}
}
```

### 2. **Environment Variables**

```env
# Production (Vercel'de ayarlanmış)
VITE_SERVER_URL=https://ai-ticket-backend-gv7o.onrender.com/api

# Development (local)
VITE_SERVER_URL=http://localhost:3001/api
```

### 3. **Vercel CLI ile Deploy**

```bash
npm install -g vercel
vercel --prod
```

### 4. **GitHub Integration**

- Vercel'e GitHub repo'yu bağlayın
- Otomatik deployment aktif olur
- Push → Build → Deploy otomatik

### 5. **Canlı Deployment**

Bu proje şu adreste çalışıyor:

- **Frontend:** [https://ai-ticket-frontend-green.vercel.app](https://ai-ticket-frontend-green.vercel.app)
- **Backend:** [https://ai-ticket-backend-gv7o.onrender.com](https://ai-ticket-backend-gv7o.onrender.com)

## 🔧 Scripts

```json
{
	"dev": "vite",
	"build": "vite build",
	"preview": "vite preview",
	"lint": "eslint . --ext js,jsx"
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile First */
sm: '640px'   /* Tablet */
md: '768px'   /* Desktop */
lg: '1024px'  /* Large Desktop */
xl: '1280px'  /* Extra Large */
```

## 🔍 Browser Desteği

- ✅ **Chrome** (son 2 sürüm)
- ✅ **Firefox** (son 2 sürüm)
- ✅ **Safari** (son 2 sürüm)
- ✅ **Edge** (son 2 sürüm)

## 🆘 Sorun Giderme

### Build Hatası

```bash
# Node modules temizle
rm -rf node_modules package-lock.json
npm install
```

### Vite Dev Server Hatası

```bash
# Port değiştir
npm run dev -- --port 3000
```

### API Bağlantı Hatası

```javascript
// src/pages içindeki fetch URL'lerini kontrol et
const response = await fetch("http://localhost:3000/api...");
```

## 🎯 Performance

- ✅ **Lazy Loading** - Router level
- ✅ **Code Splitting** - Automatic
- ✅ **Tree Shaking** - Vite default
- ✅ **Minification** - Production build

---

**Made with ❤️ using React + TailwindCSS**
