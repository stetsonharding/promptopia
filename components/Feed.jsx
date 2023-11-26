"use client";

import React, { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleClickTag }) => {
  return (
    <div className="mt-16 prompt-layout">
      {data.map((post, index) => (
        <PromptCard  
        key={post._id}
        post={post}
        handleClickTag={handleClickTag}
        />
    ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  
  const handleSearchChange = async (e) => {};
  
  useEffect(() => {
    //Make get request to api
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
        
      }
    };
    
    
    fetchPosts();
  }, []);
  console.log(posts)


  return (
    <section className="feed">
      {/* Search feed */}
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
