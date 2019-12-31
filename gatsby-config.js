/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  //The name of the plugin is important in order to let gatsby to recognize
  siteMetadata:{
    //This is site title
    title: 'Full-Stack Bootcamp!',
    author: 'Desmond Sim'
  },
  plugins:[
    {
      resolve:'gatsby-source-contentful',
      options:{
        // spaceId:'gowhe65conj6',
        // accessToken:'tFxHCO777Pj_t6Y5A2DkSlMmQUy5ElPyvkhhBC8Nxwo'
        spaceId:process.env.CONTENTFUL_SPACE_ID,
        accessToken:process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options:{
        name: 'src',
        path: `${__dirname}/src/`
      }
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins:[
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options:{
              maxWidth: 750,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    }
  ]
}
//this is a node.js file