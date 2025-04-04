import {useState,useEffect, useContext} from 'react'
import Share from './Share'
import Post from './Post'
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

function Content({username,timeline}) {
  const {user} = useContext(AuthContext);
  const [posts,setPosts] = useState([]);
  const id = user?._id;
 
  useEffect(()=>{
      const fetchPosts = async() =>{
        try {
          const res = (timeline===true) 
          ? await api.get(`/users/allPosts`) 
          :(username 
            ? await api.get(`/users/posts/all/${username}`) 
            : await api.get(`/users/timeline/${id}`));
          setPosts(res.data.allPost.sort((p1,p2)=>{
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          }));
        } catch (error) {
          console.log("error while fetching the data");
        }
      }
      fetchPosts();
  },[username,timeline])
  return (
    <div className={username?`w-[70%]`:`w-[45%]`}>
      <div className='p-5'>
        {(!username || (username===user.username && !timeline)) && <Share/>}
        {posts.length==0?<h1 className='ml-2 mt-5 text-center'>No feed available</h1>:posts.map((p)=>
          <Post key={p._id} post={p} username={username}/>
        )}
      </div>
    </div>
  )
}

export default Content