export function imgBlockHandler(state, node, parent) {
    return {
        type: "element",
        tagName: "imgBlock",
        properties: {
            alts: node.alts.join(";"),
            srcs: node.alts.join(";"),
            titles: node.titles.join(";"),
            children: []
        }
    }
}
