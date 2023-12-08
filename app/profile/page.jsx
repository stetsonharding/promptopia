"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  let router = useRouter();

  useEffect(() => {
    //Make get request to api to fetch posts
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    //Fetch posts if there is a session
    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (id) => {
    router.push(`/update-prompt?id=${id}`);
  };

  const handleDelete = async (id) => {
    const hasConfirmed = confirm(
      "Are you sure you want to remove this prompt?"
    );

    if (hasConfirmed) {
      const options = {
        method: "DELETE",
      };

      try {
        const response = await fetch(`/api/prompt/${id.toString()}`, options);

        if (response.ok) {
          const filteredPosts = posts.filter((post) => post._id !== id);

          setPosts(filteredPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
