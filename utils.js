export function displayMdastTree(node, level = 0) {
    console.log("   ".repeat(level) + node.type);
    if (node.children) {
        for (const child of node.children) {
            displayTree(child, level + 1);
        }
    }
}
