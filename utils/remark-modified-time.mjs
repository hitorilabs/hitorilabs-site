import { execSync } from "child_process";

export function remarkModifiedTime() {
    return function(_, file) {
        const filepath = file.history[0];
        const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
        let converted = result.toString() ? result.toString() : new Date().toString();
        file.data.astro.frontmatter.lastModified = converted;
    };
}
