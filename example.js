import fs from "fs";
import { retext } from "retext";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import multiimage from "./index.js";

const buffer = fs.readFileSync("./example.md");

retext()
    .use(multiimage)
    .use(remarkParse)
    .use(remarkHtml)
    .process(buffer, (err, file) => fs.writeFileSync("./example.html", String(file)));
