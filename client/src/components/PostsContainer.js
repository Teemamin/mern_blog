import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLoaderData,redirect,json } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from './Button';

function Posts() {
  const loaderData = useLoaderData()
  const  limit =  (string = '', limit = 0)=> {  
    return string.substring(0, limit)
  }
 
  return (
    <Container>
      <Row>
        {loaderData.map(post=>(<Col className='col-lg-4 col-md-6 mb-4' key={post._id}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={'https://res.cloudinary.com/docrd9dcy/image/upload/v1678806487/defauly_blog_pic_b5nndm.jpg'} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
               {limit(post.content,100)}....
            </Card.Text>
            <h6>createdAt :<small> {post.createdAt}</small></h6>
            <Link to={post._id}>
            <Button btnText="See Full Post"/>
            </Link>
            
          </Card.Body>
        </Card> 
          </Col>)
        )}
        
      </Row>
    </Container>
  );
}

export default Posts;

export const allPostsLoader = async ()=>{
  //get all products
  try {
    const {data} = await axios.get('/api/posts')
    return data
  } catch (error) {
    throw json({message: error.response.data.msg},{status: error.response.status})
  }
}