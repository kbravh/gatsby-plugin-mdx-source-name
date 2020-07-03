exports.onCreateNode = ({
    node,
    getNode,
    actions
}) => {
    const { createNodeField } = actions

    // We'll skip over non-Mdx nodes
    if (node.internal.type !== "Mdx") {
        return
    }

    // the source name will be on this parent node
    const { sourceInstanceName } = getNode(node.parent)

    // add the source name to the Mdx node
    createNodeField({
        node,
        name: "source",
        value: sourceInstanceName
    })
}