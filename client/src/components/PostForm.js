import {authFetch} from '../api/axiosDefault'
import Button from './Button';
import Form from 'react-bootstrap/Form';
import { Form as RouterForm, useActionData, redirect,json, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import classes from '../styles/PostForm.module.css'
import PostContent from './PostContent';


const PostForm = () => {
    const data = useActionData()
    const navigate  = useNavigate()
    const isSubmitting = navigate.state === 'submitting'
    const {theme,postContent} = useAppContext()
  return (
    <RouterForm method="post" encType='multipart/form-data'>
        <h1 className={classes.postHeading}>Add your awesome post</h1>
        {data && <p className={theme === 'dark' ? classes.errorDark : classes.errorLight}>{data}</p>}

        <Form.Select name='status'>
            <option value="publish">Publish</option>
            <option value="draft">Draft</option>
        </Form.Select>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name='title' placeholder="Title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Post Body</Form.Label>
          {/* <Form.Control as="textarea" style={{ height: '100px' }} name='content' placeholder="Content" /> */}
          {/* <input type="hidden" name="content" value={postContent}/> */}
          <PostContent name='content'/>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Post Image</Form.Label>
        <Form.Control type="file" name='image' />
      </Form.Group>
       
        
        <Button type="submit" disabled={isSubmitting} btnText='Add Post'/>
        
      </RouterForm>
  )
}

export default PostForm

export const action =  (appContext) => async ({request})=>{
    const { postContent } = appContext;
    const formData = await request.formData()
    const title = formData.get('title')
    const content = postContent
    const status = formData.get('status')
    formData.append("content", content);
    // console.log(Object.fromEntries(await formData))
    if(!title || !content || !status){
        throw json({message: 'Please provide all form values'},{status: 400})
    }

    try {
    const {data} = await authFetch.post('/posts/add-post',formData)
    return redirect('/')
        
    } catch (error) {
        console.log(error)
        return error.response.data.msg
    }    
}