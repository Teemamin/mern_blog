import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAppContext } from '../context/appContext';

const PostContent = ()=>{
  const {postContent, handleChangePostContent} = useAppContext()
  return <ReactQuill theme="snow" value={postContent} onChange={handleChangePostContent} style={{
    background: '#fff',
    border: '1px solid #ced4da'}}/>;
}

export default PostContent