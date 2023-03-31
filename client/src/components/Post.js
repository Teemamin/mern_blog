import { useAppContext } from '../context/appContext';
import DOMPurify from 'dompurify';

const Post = ({post}) => {

  return (
    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.content)}}/>
  )
}

export default Post