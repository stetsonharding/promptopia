"use client";

import React, { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleClickTag, searchedResults }) => {
  const promptsToRender = searchedResults.length > 0 ? searchedResults : data;

  return (
    <div className="mt-16 prompt-layout">
      {promptsToRender.map((post, index) => (
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
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);
    let searchedPrompts = filteredPrompts(searchText);

    setSearchedResults(searchedPrompts);
  };

  const filteredPrompts = (searchText) => {
    let regex = new RegExp(searchText, "i");

    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  useEffect(() => {
    //Make get request to api to fetch posts
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

  return (
    <section className="feed">
      {/* Search feed */}
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
        />
     
      </form>

      <PromptCardList
        searchedResults={searchedResults}
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
