import { visit } from "unist-util-visit";
import { modifyChildren } from "https://esm.sh/unist-util-modify-children@3";

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
        const images = [];
        visit(tree, "image", (node, index, parent) => {
            
        let currentImage = 0;
        for (const image of images) {
            // If this image comes one line before the next image then we've begun a block.
            if (
                currentImage !== images.length - 1 &&
                images[currentImage + 1].line !== null &&
                image.line === images[currentImage + 1].line - 1
            ) {
                // Create an imageBlock node to fill with all the images of the block.
                const imageBlock = {
                    type: "imageBlock",
                    children: [],
                    position: image.node.position,
                };

                // Continue iterating where we left off while subsequent lines are images,
                // and add them to the imageBlock. Right when we find a non-image, we know
                // we've reached the end of the block.
                let blockFillerImage = currentImage;
                let expectedLineDiff = 1;
                while (
                    blockFillerImage !== images.length - 1 &&
                    images[blockFillerImage].line === image.line + expectedLineDiff
                ) {
                    imageBlock.children.push(images[blockFillerImage].node);
                    images[blockFillerImage].remove();
                    blockFillerImage++;
                    expectedLineDiff++;
                }

                // Swap out the first image with the imageBlock.
                image.replaceWith(imageBlock);
            } else {
                currentImage++;
            }
        }}

        displayTree(tree);
        return tree;
    };
}
