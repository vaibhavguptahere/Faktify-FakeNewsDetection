
# 📢 Faktify - AI-Powered Fake News Detection

**Faktify** is an AI-powered fake news detection platform that empowers users to **verify the authenticity of news articles**. By leveraging **Gemini API** for intelligent comparison, it generates a **credibility scorecard**, helping users quickly determine the reliability of online content.

Our mission is to **combat misinformation** and promote responsible digital engagement with an **interactive and user-friendly experience**.

---

## 🚀 Features

✅ **Secure Authentication** – Sign in with **Google, Apple, or Phone Number** using **Clerk**  
✅ **Fake News Detection** – Submit a **news article or summary** to receive a **credibility score and analysis**  
✅ **Gemini-Powered Verification** – Gemini API compares submitted content with verified facts to determine authenticity  
✅ **Credibility Scorecard** – Visual feedback showing probability of news being fake or real with reasoning  
✅ **Verified News Section** – Browse fact-checked news articles with filters for **politics, science, sports**, and more  
✅ **Search & Filter System** – Easily locate news using **keywords** or **interest-based categories**  
✅ **User Feedback System** – Users can rate the accuracy of detections and submit feedback for improvement  
✅ **Interactive Features** – Enjoy **quizzes and games** related to fake news and misinformation  
✅ **Community Section** – Users can **share news they find**, explore community posts, **like and interact** with content  
✅ **Modern UI/UX** – Clean, intuitive, and responsive interface across all devices

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Next.js, Tailwind CSS  
- **Backend:** Flask, Node.js (for integration and routing)  
- **Authentication:** Clerk (Google, Apple, Phone Number login)  
- **Database:** MongoDB (user data, news history, community posts, feedback)  
- **AI Integration:** Gemini API (for content comparison and credibility scoring)  
- **News & Fact-Check Sources:** News API, Google Fact Check API  
- **Deployment:** Vercel (Frontend), Local backend (currently not cloud-hosted)

---

## 🧠 How Faktify Works

### 1️⃣ User Interaction Layer (Frontend)
- User logs in securely via **Clerk**
- Inputs **news title, summary, or link**
- Receives a **credibility score** and breakdown
- Can access **verified news feed**, play games, or explore **community-shared content**

### 2️⃣ Backend Processing
- News input sent to **Gemini API** for evaluation
- Gemini compares it against real-world data using **Fact Check & News APIs**
- Returns a **detailed credibility scorecard**
- Stores user interactions and feedback in **MongoDB**

### 3️⃣ Community & Feedback System
- Logged-in users can **submit suspicious news**, which others can view, search, and like
- Each result includes a **comparison summary** and **community insights**
- Feedback data is stored and reviewed for future improvements

---

## 📸 Interface Previews (Snapshots)

> 🔗 [Live Demo](https://faktify-fakenews.vercel.app/)  
> *(Includes detection flow, community page, and interactive quizzes)*

---

## 🧪 Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/Faktify.git
cd Faktify
```

### Step 2: Install Dependencies
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

### Step 3: Add Environment Variables
Create a `.env` file and add:
```env
CLERK_API_KEY=your_clerk_api_key
MONGO_URI=your_mongodb_connection
NEWS_API_KEY=your_newsapi_key
FACTCHECK_API_KEY=your_google_factcheck_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Step 4: Run the Application
```bash
# Frontend
npm run dev

# Backend
python app.py
```

---

## 👥 Team Members

| Name             | Role                        | GitHub                                         | LinkedIn                                                                 |
|------------------|-----------------------------|------------------------------------------------|--------------------------------------------------------------------------|
| **Vaibhav Gupta**  | Team Lead, Full Stack Dev   | [GitHub](https://github.com/vaibhavguptahere)  | [LinkedIn](https://www.linkedin.com/in/vaibhavguptahere-/)              |
| **Nishika Kansal** | Frontend Developer          | [GitHub](https://github.com/Nishikakansal)     | [LinkedIn](https://www.linkedin.com/in/nishika-kansal-870b18322/)       |
| **Giriraj Mantri** | AI/ML & Integration Lead    | [GitHub](https://github.com/GirirajMantri)     | [LinkedIn](https://www.linkedin.com/in/giriraj-mantri-25a57b217/)       |
| **Isha Katiyar**   | Backend Developer           | [GitHub](https://github.com/isha-1686)         | [LinkedIn](https://www.linkedin.com/in/isha-katiyar-432156326/)         |

---

## 🛠️ Contribution Guidelines

We welcome open-source contributions!

1. Fork the repo  
2. Create a new branch (`feature/your-feature`)  
3. Commit your changes  
4. Push and submit a Pull Request

---

## 📌 Roadmap & Upcoming Features

- [ ] **Multi-language support**  
- [ ] **Browser extension for quick fact-checking**  
- [ ] **User-based credibility scoring (trust scores)**  
- [ ] **Admin panel to monitor community posts & feedback**

---

## 📃 License

This project is under the [MIT License](LICENSE).

---

### 🌟 Star this project if you found it helpful — it motivates us to keep improving!
