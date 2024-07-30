import React, { useEffect, useState } from 'react';
import "./home.css";
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts" + search);
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          console.error('Expected an array but got:', res.data);
          setPosts([]);  // Fallback to an empty array if the response is not an array
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);  // Fallback to an empty array on error
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
