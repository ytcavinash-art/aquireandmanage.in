import { Helmet } from "react-helmet-async";
import { blogs } from "./data/blogs";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog | A&M Advisory</title>

        <meta
          name="description"
          content="Latest updates on Mumbai SRA redevelopment, MHADA, Government policies, facility management and infrastructure."
        />
      </Helmet>

      <Nav />

      <main className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold mb-4">
          Latest Articles
        </h1>

        <p className="text-gray-600 mb-10">
          Stay updated with redevelopment news, SRA policies and industry insights.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {blogs.map((blog) => (

            <article
              key={blog.id}
              className="rounded-xl border overflow-hidden shadow hover:shadow-lg transition"
            >

              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <span className="text-sm text-blue-600">
                  {blog.category}
                </span>

                <h2 className="text-xl font-bold mt-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mt-3">
                  {blog.description}
                </p>

                <div className="mt-4 text-sm text-gray-500">
                  {blog.author} • {blog.date}
                </div>

                <a
                  href={`/blog-${blog.slug}.html`}
                  className="inline-block mt-5 text-blue-600 font-semibold"
                >
                  Read More →
                </a>

              </div>

            </article>

          ))}

        </div>

      </main>

      <Footer />
    </>
  );
}