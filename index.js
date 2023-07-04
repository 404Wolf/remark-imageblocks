import { visit } from "unist-util-visit";


export default function remarkImageBlock() {
    return (tree, file) => {
        visit(tree, "paragraph", (node, index, parent) => {
            if (node.children) {
                const children = node.children.filter(
                    child => !(child.type === "text" && child.value === "\r\n")
                )
                if (children.every(child => child.type === "image") && children.length > 1) {
                    node.children = [{
                        type: "imgBlock",
                        alts: children.map(child => child.alt),
                        srcs: children.map(child => child.src),
                        titles: children.map(child => child.title),
                        position: {
                            start: children[0].position.start,
                            end: children.slice(-1)[0].position.end
                        }
                    }]
                }
            }
        });

        return tree;
    };
}
