# 💪 Pushup Tracker

A real-time, peer-to-peer pushup tracking application built with Nuxt 3 and RxDB. Track your workouts and compete with friends - all with data that stays in your control.

[![Visit Pushup Tracker](https://img.shields.io/badge/Visit%20Pushup%20Tracker-007bff?style=for-the-badge&logo=appveyor)](https://pushup-tracker.netlify.app/)

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
- [Dexie.js](https://dexie.org/) - IndexedDB Wrapper
- [Nuxt Icons](https://nuxt.com/modules/icon) - Nuxt Icons Module

## 🚀 Quick Start

1. Clone the repository:

```
   git clone https://github.com/patsma/pushup-tracker.git
   cd pushup-tracker
```

2. Install dependencies

```
   npm install
```

3. Start the development server:

```
   npm run dev
```

4. Open http://localhost:3000 in your browser

## 📖 How It Works

The application uses a local-first architecture, meaning:

- Your data stays on your device
- Synchronization happens peer-to-peer through WebRTC
- Works offline by default
- No central server required - please note signaling server is needed, but there's a free one, check https://rxdb.info/replication-webrtc.html#signaling-server
- Users can join specific rooms using URL hash (if you change the URL, you will have to refresh the page to join new room)

## 🌱 Project Origins

This project evolved from a fork of [bencodezen's local-first-nuxt-todomvc](https://github.com/bencodezen/local-first-nuxt-todomvc), transforming from a todo app into a fitness tracking application. The journey included:

- Reimagining the todo concept into a pushup counter
- Adding real-time leaderboard functionality
- Implementing GSAP animations
- Creating custom SVG logo and branding
- Enhancing mobile responsiveness
- Add more WebRTC peer-to-peer connectivity - delete, remove, leaderboard, etc.
- Basic auth for friends and family
- Nuxt UI for styling

## 📚 Resources

Learn more about local-first software:

- [Local-First Software Community](https://localfirstweb.dev/)
- [Local-first software: You own your data, in spite of the cloud](https://www.inkandswitch.com/local-first/)
- [The past, present, and future of local-first - Martin Kleppmann](https://www.youtube.com/watch?v=NMq0vncHJvU)

## 🙏 Acknowledgments

- [Ben Hong](https://github.com/bencodezen) - Original todo app creator
- [Daniel Meyer](https://github.com/pubkey) - RxDB creator and inspiration
- [Local-First Community](https://localfirstweb.dev/) - For promoting local-first principles

## 🛠️ Project Issues and Considerations

As with any software project, the Pushup Tracker has encountered its share of challenges and considerations:

- **Real-time Synchronization**: While the peer-to-peer synchronization through WebRTC is a powerful feature, it can introduce complexities in managing state across different clients. Ensuring that all users see the same data in real-time requires careful handling of events and data consistency.

- **Offline Functionality**: The local-first architecture allows for offline usage, but it also means that users may experience delays in data synchronization once they reconnect. Strategies for conflict resolution and data merging are essential to provide a seamless user experience.

- **User Experience**: As the application evolves, maintaining a clean and intuitive user interface is crucial. Continuous user feedback is necessary to identify pain points and improve usability.

- **Scalability**: While the current implementation works well for small groups, scaling the application to support larger user bases may require additional considerations, such as optimizing data handling and improving the signaling server's performance.

- **Security**: With peer-to-peer connections, ensuring the security of user data and communications is paramount. But here we have most basic auth just for friends and family ease of usage

**Final Notes**:

- There are known issues with the delete functionality (which I should do differently), which result in replication errors being logged in the console. This may be related to the signaling server, as these issues began to appear after I integrated my own server.

- The errors occur specifically when a user attempts to delete an entry. While other users can see the deletion, the client that performed the deletion encounters an error. Although the functionality remains intact, this replication error is not critical but it would be lovely to address it somewhere in the futur - I tried couple of things but it's hard to test

- I did removed TypeScript from few of the files since I was getting too many errors, too much new stuff that I need to learn, I tried to fix it couple of times but this getts quite complex with the RxDB types - need to learn couple more things about it - I just didn't want to make it unreadable and more complex than it already is by adding some TS magic that would eventually mark things I don't understand as 'any', so maybe one day I'll fix that, or use that energy to build something solid next time ;)

- This code serves as an experiment to explore the capabilities of AI tools and the extent of automation possible in development. Much of the code was generated and briefly reviewed, providing a valuable learning opportunity and a quick way to prototype features.

- Please note this code is not production-ready - it's just a fun project that can be share with friends and family for some group motivation vibes

[![Visit Pushup Tracker](https://img.shields.io/badge/Visit%20Pushup%20Tracker-007bff?style=for-the-badge&logo=appveyor)](https://pushup-tracker.netlify.app/)

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details
