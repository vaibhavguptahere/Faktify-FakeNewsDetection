# 📢 Faktify - AI-Powered Fake News Detection

Faktify is an AI-powered fake news detection platform designed to verify the authenticity of news articles. Using advanced AI models like **BERT** and **LLaMA**, Faktify analyzes news content and generates a **credibility scorecard** to help users determine whether the news is real or fake. 

---

## 🚀 Features

✅ **Secure Authentication** - Users can sign in using **Google, Apple, or Phone Number** via **Clerk**.  
✅ **AI-Powered Fake News Detection** - Faktify analyzes news articles and generates a **credibility score**.  
✅ **Verified News Hub** - Users can browse **fact-checked news articles** with category filters.  
✅ **User Feedback System** - Users can rate AI accuracy and submit feedback.  
✅ **Interactive Features** - Includes **games & quizzes** to make fact-checking engaging.  
✅ **Advanced News Filtering** - Users can filter news based on **category & interest**.  
✅ **Scalability & Future Enhancements** - Plans for **multi-language support** and **social media/browser integrations**.

---

## 🔧 Tech Stack

- **Frontend:** React, Next.js
- **Backend:** Node.js, Flask
- **Database:** MongoDB
- **AI Models:** BERT, LLaMA, Logistic Regression, SVM, Random Forest
- **Authentication:** Clerk
- **APIs Used:** News API, Google Fact Check API
- **Hosting & Deployment:** AWS/GCP/Azure

---

## 🏗️ System Architecture

### **1️⃣ User Interaction Layer (Frontend)**
- User logs in via **Clerk (Google/Apple/Phone Number)**.
- Users submit **news summaries** for verification.
- AI-generated **credibility scorecard** is displayed.
- **Verified news** is available with filtering options.

### **2️⃣ Backend (Business Logic & AI Processing)**
- **API Gateway (Node.js/Flask)** handles requests.
- AI models analyze **news credibility**.
- User feedback is **stored & used** to improve accuracy.

### **3️⃣ Data Storage & Processing Layer**
- **MongoDB** stores user data & verified news.
- **AI Model Storage** for training datasets.

### **4️⃣ External Services & Integrations**
- **Clerk** for authentication.
- **Third-party News APIs** for verified sources.
- **Cloud Hosting (AWS/GCP/Azure)** for scalability.

---

## 📜 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/Faktify.git
cd Faktify
```

### 2️⃣ Install Dependencies
```bash
npm install   # For frontend dependencies
pip install -r requirements.txt   # For backend dependencies
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file and add:
```env
CLERK_API_KEY=your_clerk_api_key
MONGO_URI=your_mongodb_connection
NEWS_API_KEY=your_newsapi_key
FACTCHECK_API_KEY=your_google_factcheck_api_key
```

### 4️⃣ Run the Application
```bash
# Start the frontend
npm run dev   

# Start the backend
python app.py
```

---

## 👥 Team Members

| Name | Role | GitHub | LinkedIn |
|------|------|--------|----------|
| **Vaibhav Gupta** | Team Lead, Full Stack Developer | [GitHub](https://github.com/vaibhavguptahere) | [LinkedIn](https://www.linkedin.com/in/vaibhavguptahere-/) |
| **Nishika Kansal** | Frontend Developer | [GitHub](https://github.com/Nishikakansal) | [LinkedIn](https://www.linkedin.com/in/nishika-kansal-870b18322/) |
| **Giriraj Mantri** | AI/ML Expert | [GitHub](https://github.com/GirirajMantri) | [LinkedIn](https://www.linkedin.com/in/giriraj-mantri-25a57b217/) |
| **Isha Katiyar** | Backend Developer | [GitHub](https://github.com/isha-1686) | [LinkedIn](https://www.linkedin.com/in/isha-katiyar-432156326/) |
---

## 📬 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your branch and create a pull request.

---

## 📂 MVP & Project Snapshots
📸 Check out our **MVP and snapshots** of the project: [MVP Link](https://faktify-fakenews.vercel.app/)

---


### ⭐ If you like this project, consider giving it a **star** on GitHub! ⭐

