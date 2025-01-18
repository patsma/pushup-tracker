# 💪 Pushup Tracker

A real-time, peer-to-peer pushup tracking application built with Nuxt 3 and RxDB. Track your workouts and compete with friends - all with data that stays in your control.

## ✨ Features

- 🔄 Real-time peer-to-peer synchronization
- 🔌 Offline-first architecture
- 🏃‍♂️ No backend required
- 📱 Mobile-responsive design
- 🏆 Live leaderboard
- 🎨 Animated SVG pushup counter
- 🔒 Local-first data ownership

## 🛠️ Tech Stack

- [Nuxt 3](https://nuxt.com) - Vue.js Framework
- [RxDB](https://rxdb.info/) - Local-First Database
- [WebRTC](https://webrtc.org/) - Real-time Communication
- [GSAP](https://greensock.com/gsap/) - Animations
- [Nuxt UI](https://ui.nuxt.com/) - UI Components
- [TailwindCSS](https://tailwindcss.com/) - Styling

## 🚀 Quick Start

1. Clone the repository:
   git clone https://github.com/patsma/pushup-tracker.git
   cd pushup-tracker
2. Install dependencies
   npm install
3. Start the development server:
   npm run dev

4. Open http://localhost:3000 in your browser

## 📖 How It Works

The application uses a local-first architecture, meaning:

- Your data stays on your device
- Synchronization happens peer-to-peer through WebRTC
- Works offline by default
- No central server required
- Users can join specific rooms using URL hash

## 🌱 Project Origins

This project evolved from a fork of [bencodezen's local-first-nuxt-todomvc](https://github.com/bencodezen/local-first-nuxt-todomvc), transforming from a todo app into a fitness tracking application. The journey included:

- Reimagining the todo concept into a pushup counter
- Adding real-time leaderboard functionality
- Implementing GSAP animations
- Creating custom SVG logo and branding
- Enhancing mobile responsiveness
- Adding WebRTC peer-to-peer connectivity

## 📚 Resources

Learn more about local-first software:

- [Local-First Software Community](https://localfirstweb.dev/)
- [Local-first software: You own your data, in spite of the cloud](https://www.inkandswitch.com/local-first/)
- [The past, present, and future of local-first - Martin Kleppmann](https://www.youtube.com/watch?v=NMq0vncHJvU)

## 🙏 Acknowledgments

- [Ben Hong](https://github.com/bencodezen) - Original todo app creator
- [Daniel Meyer](https://github.com/pubkey) - RxDB creator and inspiration
- [Local-First Community](https://localfirstweb.dev/) - For promoting local-first principles

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details
