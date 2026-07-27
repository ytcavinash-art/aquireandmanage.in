export interface Blog {

  id:number;
  slug:string;
  title:string;
  description:string;
  image:string;
  author:string;
  date:string;
  category:string;
  content:string;

}

export const blogs:Blog[]=[

{

id:1,

slug:"mumbai-sra-policy-2026",

title:"Mumbai SRA Policy 2026",

description:"Latest redevelopment updates",

image:"/images/hero-poster.jpg",

author:"A&M",

date:"22 July 2026",

category:"SRA",

content:`

<h2>Mumbai SRA Policy</h2>

<p>Your article here...</p>

`

},

];
