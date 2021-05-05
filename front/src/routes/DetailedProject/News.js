import ReactMarkdown from "react-markdown";

const POSTS = [
    {
        title: 'HELLO',
        text: `

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
__________

* Lists
* [ ] todo
* [x] done`,
        img: 'https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk'
    }
]

function Post({post}) {
    return <div>
        <h1>{post.title}</h1>
        {post.img && <img src={post.img} alt='' />}
        <ReactMarkdown children={post.text}/>
        <hr/>
    </div>
}

export default function News({posts}) {
    posts = posts || POSTS;
    return (
        <div>
            {posts.map(post => <Post post={post}/>)}
        </div>)
}
