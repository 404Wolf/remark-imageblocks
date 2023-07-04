import fs from "fs";
import { retext } from "retext";
import remarkParse from "remark-parse";
import remarkImageBlock from "./index.js";
import remarkRehype from "remark-rehype/lib/index.js";
import { imgBlockHandler, imgHandler } from "./handlers.js";
import rehypeStringify from "rehype-stringify/lib/index.js";

const buffer = fs.readFileSync("./example.md");

retext()
    .use(remarkParse)
    .use(remarkImageBlock)
    .use(remarkRehype, {
        handlers: { imgBlock: imgBlockHandler, image: imgHandler },
    })
    .use(rehypeStringify)
    .process(buffer, (err, file) => {
        const rendered = String(file);
        console.log(rendered);
        fs.writeFileSync("./example.html", String(file))
    });
