import { normalizeUri } from 'micromark-util-sanitize-uri'


export function imgBlockHandler(state, node, parent) {
    return {
        type: "element",
        tagName: "imgBlock",
        properties: {
            alts: node.alts.join(";"),
            srcs: node.srcs.map(normalizeUri).join(";"),
            titles: node.titles.join(";"),
            properties: node.properties.join(";")
        },
        children: []
    }
}

export function imgHandler(state, node, parent) {
    const properties = {}
    for (const property of node.url.matchAll(/((\w+)=(\w+))/g)) {
        properties[property[2]] = property[3]
    }
    const url = /\w*|\w=*/.test(node.url) ? node.url.match(/([^\s^\|]*)\|/)[1] : node.url

    console.log(properties)

    return {
        type: "element",
        tagName: "img",
        properties: {
            alt: node.alt,
            src: url,
            title: node.title,
            ...properties,
        },
        children: []
    }
}
