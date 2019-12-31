const path = require("path")

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    // console.log(JSON.stringify(node, undefined, 4))
    const slug = path.basename(node.fileAbsolutePath, ".md")
    console.log("@@@@@@@@", slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    console.log("@@@@@@@@", slug)
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/blog.js")
  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  //2:43:00

  res.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    })
  })

  //1. get path to template
  //2. get markdown data
  //3. create new pages
}
