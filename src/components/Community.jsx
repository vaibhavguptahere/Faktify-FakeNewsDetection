import { useState,useEffect } from "react";
import axios from "axios";
import { SendHorizonal } from "lucide-react";

function PostForm({ userId, onPostCreated }) {
  useEffect(() => {
    document.title = "Community | Faktify";
  }, []);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/posts", {
      userId,
      title,
      link,
      description,
    });
    setTitle("");
    setLink("");
    setDescription("");
    onPostCreated(); // Refresh list
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">📢 Share a Fake News Alert</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (e.g. Fake Headline)"
          required
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link to the news/article"
          required
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Why do you think this news is fake?"
          rows={4}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <SendHorizonal size={18} />
          Submit Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;
