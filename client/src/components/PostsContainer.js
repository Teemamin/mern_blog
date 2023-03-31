import {authFetch } from '../api/axiosDefault';
import { Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLoaderData,json, Await,defer } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from './Button';
import classes from '../styles/PostsContainer.module.css'
import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import PageBtnContainer from './PageBtnContainer';
import PostsList from './PostsList';


function Posts() {
  const {postData} = useLoaderData()
  const {page,changePage} = useAppContext()
  // const pageBtn = Array.from({length:numOfPages},(_,index)=>index + 1)
  const appContext = useAppContext();
  

 
  useEffect(()=>{
    allPostsLoader(appContext)
  },[page])
 
  return (
    <Container>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={postData}>
        {(loadedPosts) => (
            <PostsList posts={loadedPosts.posts} numOfPages={loadedPosts.numOfPages}/>
            
        )}
      </Await>
    </Suspense>
    </Container>
  );
}

export default Posts;

async function loadPosts(url){
  try {
    const {data} =  await authFetch.get(url)
    // console.log(data) {posts: Array(4), numOfPages: 3}
    return data
  } catch (error) {
    throw json({message: error.response.data.msg},{status: error.response.status})
  }
}


export const allPostsLoader = (appContext) => async ()=>{
  const { page} = appContext;
  const url = `/posts?page=${page}`


  return defer({
    postData: loadPosts(url),
  });
  
}