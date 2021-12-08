import React from "react";
import CommentsFeed from "./components/CommentsFeed";

import "./assets/base.css";
import "./assets/typography.css";
import "./assets/colors.css";
import "./assets/button.css";
import "./assets/utility.css";
import "./assets/form.css";

import "./assets/App.css";

function App() {
  return (
    <div>
      <header>
        <h1 className="title">Comments Feed</h1>
      </header>

      <main>
        <CommentsFeed />
      </main>
    </div>
  );
}

export default App;
