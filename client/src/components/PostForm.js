import { Form,json,redirect } from "react-router-dom"
import axios from "axios"
const PostForm = () => {
  return (
    <Form action="post">
        <input type="" name="" value="" />
    </Form>
  )
}

export default PostForm

export const action = async ({request})=>{
    const formData = await request.formData()
    const title = formData.get('title')
    const content = formData.get('content')
    const status = formData.get('status')
    const imagePath = formData.get('imagePath')
    if(!title || !content || !status || !imagePath){
        throw json({message: 'Please provide all values'},{status: 400})
    }
    const postData = {
        title: title,
        content: content,
        status: status,
        imagePath: imagePath
    }
    try {
    const {data} = await axios.post('/api/add-post',postData)
    console.log(data)
        
    } catch (error) {
        return error.response.data.msg
    }    
}