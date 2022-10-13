import React from 'react';
import './Home.css';
import Post from '../../Components/Post/Post';
import CreatePost from '../../Components/CreatePost/CreatePost';

export default function Home() {
  return (
    <>
      <CreatePost/>
      <h1 className="home-title">Tous les articles</h1>
      <div className="container-posts">
        <Post>
          <h2>Hello world</h2>
        </Post>
        <Post>
          <h2>Hello world</h2>
        </Post>
        <Post>
          <h2>Hello world</h2>
        </Post>
        <Post>
          <h2>Hello world</h2>
        </Post>
      </div>
    </>
  );
}
