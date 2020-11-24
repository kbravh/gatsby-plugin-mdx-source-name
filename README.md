## Description

Add a `gatsby-source-filesystem` source name to Mdx nodes for enhanced querying in GraphQL.

## How to install

Install with npm:

``` BASH
npm install gatsby-plugin-mdx-source-name
```

or with yarn:

``` BASH
yarn add gatsby-plugin-mdx-source-name
```


## When do I use this plugin?

This plugin is very useful if you are using multiple instances of `gatsby-source-filesystem` as it will allow you to query the `name` field from the source plugin on your `Mdx` nodes. 

## Examples of usage

Add this plugin to you `gatsby-config.js` file. Be sure to also include the `gatsby-source-filesystem` plugin, and add a `name` for the mdx files in the source plugin.

``` js
plugins: [
    `gatsby-plugin-mdx-source-name` ,
    {
        resolve: `gatsby-source-filesystem` ,
        options: {
            path: `${__dirname}/src/blog` ,
            name: `blog` // this name will be added to the Mdx nodes
        }
    }
]
```

The source name will now be available to query via GraphQL:

``` js
const query = graphql`
query {
    allMdx(){
        nodes {
           id
           fields {
               source
           }
        }
    }
}`
```

For example, if you wanted to filter by this new source field on page creation, you could do the following:

```js
// gatsby-node.js

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions
    
    // query for all Mdx pages
    const query = graphql(`
        query {
            allMdx(){
                nodes {
                    fields {
                        source
                    }
                    frontmatter {
                        slug
                    }
                }
            }
        }
    `)

    return query.then(result => {
        // filter by source name "blog"
        const posts = result.data.allMdx.nodes.filter(node => node.fields.source === 'blog')

        posts.forEach(node => {
            createPage({
                path: `/blog/${node.frontmatter.slug}`,
                component: path.resolve('src/templates/blog-post.js'),
                context: {
                    slug: node.frontmatter.slug
                }
            })
        })
    })
}
```
