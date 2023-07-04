import { visit } from "unist-util-visit";

// Function to display the entire tree
export function displayTree(node, level = 0) {
    console.log("   ".repeat(level) + node.type);
    if (node.children) {
        for (const child of node.children) {
            displayTree(child, level + 1);
        }
    }
}

export default function multiimage() {
    return (tree, file) => {
        visit(tree, "image", (node, index, parent) => {
            if (
                index === 0 &&
                parent &&
                parent.children &&
                parent.children.length > 1 &&
                parent.children[1].type === "text" &&
                /\r\n/.test(parent.children[1].value)
            ) {
                const imageBlock = [];
                let expectingText = false;
                for (const child of parent.children) {
                    if (child.type === "image" && !expectingText) {
                        imageBlock.push({
                            title: child.title,
                            url: child.url,
                            alt: child.alt,
                        });
                        expectingText = true;
                    } else if (child.type === "text" && expectingText) {
                        expectingText = false;
                    } else {
                        break;
                    }
                }
                parent.children.splice(0, imageBlock.length + 1, {
                    type: "imageBlock",
                    images: imageBlock,
                    position: node.position,
                });
            }
        });

        return tree;
    };
}
