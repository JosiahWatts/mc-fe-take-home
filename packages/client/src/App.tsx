import React from "react";
import CommentsFeed from "./components/CommentsFeed";

import "./styles/base.css";
import "./styles/typography.css";
import "./styles/colors.css";
import "./styles/button.css";
import "./styles/utility.css";
import "./styles/form.css";

import "./styles/App.css";

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
