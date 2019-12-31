import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Layout from "../components/layout"
import blogStyles from './blog.module.scss'

const BlogPage = () => {
  const data = useStaticQuery(graphql`
 query{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          data
        }
        fields {
          slug
        }
      }
    }
  }
  allContentfulBlogPost(
    sort:{
      fields:publishedDate,
      order:DESC
    }
  ){
    edges{
      node{
        title
        slug
        publishedDate(formatString:"MMMM Do, YYYY")
      }
    }
  }
}
`)
  console.log(data)
  return (
    <Layout>
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map(edge => {
          return (
            <li className={blogStyles.post}>
              <Link to={`/blog/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>{edge.node.frontmatter.data}</p>
              </Link>
            </li>
          )
        })}
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className={blogStyles.post}>
              <Link to={`/blog/${edge.node.slug}`}>
                <h2>{edge.node.title}</h2>
                <p>{edge.node.publishedDate}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogPage

//Goal: Create an about page and a contact page
