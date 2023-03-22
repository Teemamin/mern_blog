import axios from "axios"
import { useLoaderData,json } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PostDetail = () => {
  const {post} = useLoaderData()
  console.log(post)
  return (
    <Row>
      <Col>
        <h6>{post.createdAt}</h6>
        <div>
          <img src={post.imagePath}/>
        </div>
      </Col>
      <Col>
        <div>
          <p>
            {post.content}
          </p>
        </div>
      </Col>
    </Row>
  )
}

export default PostDetail

export const loader = async ({params})=>{
  const postId = params.id
  try {
    const {data} = await axios.get(`/api/posts/get-post/${postId}`)
    return data
  } catch (error) {
    throw json({message: error.response.data.msg},{status: error.response.status})
  }
}