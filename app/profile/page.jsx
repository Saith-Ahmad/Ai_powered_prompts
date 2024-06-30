'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!session?.user.id) return;

      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [session?.user.id]); // Only dependent on session.user.id

  const handleEdit = (post) => {
    router.push(`update-prompt/${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete?");
    if (hasConfirmed) {
      try {
        const result = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        if (result.ok) {
          // Filter out the deleted post
          const filteredPosts = posts.filter((item) => item._id !== post._id);
          setPosts(filteredPosts);
        } else {
          console.log("Failed to delete the post");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc="Welcome to Your Personalized Profile Page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
