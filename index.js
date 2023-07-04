import { visit } from "unist-util-visit";


export default function remarkImageBlock() {
    return (tree, file) => {
        visit(tree, "paragraph", (node, index, parent) => {
            if (node.children) {
                const children = node.children.filter(
                    child => !(child.type === "text" && child.value === "\r\n")
                )
                if (children.every(child => child.type === "image") && children.length > 1) {
                    parent.children[index] = {
                        type: "imgBlock",
                        alts: children.map(child => child.alt),
                        srcs: children.map(
                            child =>
                                child.url.includes("|") ? child.url.split("|")[0] : child.url
                        ),
                        titles: children.map(child => child.title),
                        properties: children.map(
                            child => child.url.includes("|") ? child.url.split("|").slice(1) : ""
                        ),
                        position: {
                            start: children[0].position.start,
                            end: children.slice(-1)[0].position.end
                        }
                    }
                }
            }
        });
        return tree;
    };
}
