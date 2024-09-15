import {useState,useEffect, useContext} from 'react'
import Share from './Share'
import Post from './Post'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Content({username,timeline}) {
  const {user} = useContext(AuthContext);
  const [posts,setPosts] = useState([]);
  const id = user?._id;
 
  useEffect(()=>{
      const fetchPosts = async() =>{
        try {

          const res = (timeline===true) 
          ? await axios.get(`http://127.0.0.1:8080/api/v1/users/allPosts`) 
          :(username 
            ? await axios.get(`http://127.0.0.1:8080/api/v1/users/posts/all/${username}`) 
            : await axios.get(`http://127.0.0.1:8080/api/v1/users/timeline/${id}`));
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
        {(!username || username===user.username) && <Share/>}
        {posts.length==0?<h1 className='ml-2 mt-5 text-center'>No feed available</h1>:posts.map((p)=>
          <Post key={p._id} post={p} username={username}/>
        )}
      </div>
    </div>
  )
}

export default Content