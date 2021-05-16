import ReactMarkdown from "react-markdown";

function Post({post}) {
    return <div>
        <h1>{post.title}</h1>
        {post.img && <img src={post.img} alt='' />}
        <ReactMarkdown children={post.text}/>
        <hr/>
    </div>
}

export default function News({posts}) {
    return (
        <div>
            {posts?.map(post => <Post post={post}/>)}
        </div>)
}
