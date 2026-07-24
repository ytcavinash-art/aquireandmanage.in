import { blogs } from "./data/blogs";

export default function BlogDetails(){

const slug=window.location.pathname
.replace("/blog-","")
.replace(".html","");

const post=blogs.find(x=>x.slug===slug);

if(!post){

return <h1>Blog not found</h1>;

}

return(

<div className="max-w-5xl mx-auto py-20">

<h1>{post.title}</h1>

<div dangerouslySetInnerHTML={{__html:post.content}}/>

</div>

);

}
