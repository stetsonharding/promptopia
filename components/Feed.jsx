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
  const [posts, setPosts] = useState([]);

  //Search states
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  //Function to handle search changes
  const handleSearchChange = (e) => {
    //Clear timer
    clearTimeout(searchTimeout);
    //Update users search value
    setSearchText(e.target.value);

    // debounce method - used for not searching on every char typed.
    //After user has stopped typing for .5 seconds the filtering will begin
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  //Function to filter prompts based on username, tag, or prompt
  const filteredPrompts = (searchText) => {
    let regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  //Function to search prompts based on tag user clicked on
  const handleClickTag = (tag) => {
    setSearchText(tag);
    let searchedTags = filteredPrompts(tag);
    setSearchedResults(searchedTags);
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
        handleClickTag={handleClickTag}
      />
    </section>
  );
};

export default Feed;
