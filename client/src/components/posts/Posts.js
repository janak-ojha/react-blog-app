import './posts.css';
import Post from '../post/Post';

export default function Posts({ posts }) {
  if (!Array.isArray(posts)) {
    console.error('Expected posts to be an array but got:', posts);
    return <div>No posts available</div>;
  }

  return (
    <div className='posts'>
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}
