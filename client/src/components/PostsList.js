import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from './Button';
import classes from '../styles/PostsContainer.module.css'
import PageBtnContainer from './PageBtnContainer';
import DOMPurify from 'dompurify';

const PostsList = ({posts,numOfPages}) => {
    const pageBtn = Array.from({length:numOfPages},(_,index)=>index + 1)

    const  limit =  (string = '', limit = 0)=> {  
        let trimmedString = string.replace(<p></p>, '')
        trimmedString.substring(0, limit)
        return {__html: DOMPurify.sanitize(trimmedString)}
      }

    const convertISOToDATE = (isoDate)=>{
        const date = new Date(isoDate)
        let day = date.getDay()
        let  month = date.getMonth()
        const year = date.getFullYear()
        let mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if(day < 10){
            day  = '0' + day
        }

        // if(month < 10){
        //     month = '0' + month
        // }
        return `${mL[month-1]}, ${year}, ${day} `
    }
  return (
    <Row className={classes.row}>
    {posts.map(post=>(<Col className='col-lg-4 col-md-6 mb-4  d-flex align-items-stretch"' key={post._id}>
    <Card style={{ width: '18rem', color:'#333'}}>
      <Card.Img variant="top" src={post.imagePath ? post.imagePath : 'https://res.cloudinary.com/docrd9dcy/image/upload/v1678806487/defauly_blog_pic_b5nndm.jpg'} style={{
      
            width: '100%',
            height: '20vw',
            objectFit: 'cover'
       
      }}/>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text dangerouslySetInnerHTML={limit(post.content,10)}/>
        <hr/>
        <p class="card-text text-muted h6">{convertISOToDATE(post.createdAt)}</p>
        {/* <h6>createdAt :<small> {convertISOToDATE(post.createdAt)}</small></h6> */}
        <Link to={post._id}>
        <Button btnText="See Full Post"/>
        </Link>
        
      </Card.Body>
    </Card> 
      </Col>)
    )}
    {numOfPages > 1 && <PageBtnContainer pageBtn={pageBtn}/>}
  </Row>
  )
}

export default PostsList