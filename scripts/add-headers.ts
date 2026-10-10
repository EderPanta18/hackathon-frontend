import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_SOURCE = "src";

const TARGET_EXTENSIONS = new Set([".ts", ".tsx"]);

function getArgValue(index: number): string | undefined {
    return process.argv[index];
}

function toPosixPath(value: string): string {
    return value.split(path.sep).join("/");
}

function removeExistingHeader(content: string): string {
    return content.replace(/^\s*\/\/\s+.*\.(ts|tsx)\s*(\r?\n){1,2}/, "");
}

async function pathExists(targetPath: string): Promise<boolean> {
    try {
        await stat(targetPath);

        return true;
    } catch {
        return false;
    }
}

async function getSourceFiles(directory: string): Promise<string[]> {
    const entries = await readdir(directory, {
        withFileTypes: true,
    });

    const files: string[] = [];

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...(await getSourceFiles(fullPath)));

            continue;
        }

        if (!entry.isFile()) continue;

        const extension = path.extname(entry.name);

        if (!TARGET_EXTENSIONS.has(extension)) continue;

        files.push(fullPath);
    }

    return files;
}

async function main(): Promise<void> {
    const root = process.cwd();
    const source = getArgValue(2) ?? DEFAULT_SOURCE;
    const target = path.resolve(root, source);

    if (!(await pathExists(target))) {
        console.error(`[ERROR] La ruta de origen "${source}" no existe.`);

        process.exitCode = 1;

        return;
    }

    const files = await getSourceFiles(target);

    for (const file of files) {
        const relativePath = toPosixPath(path.relative(root, file));
        const content = await readFile(file, "utf8");

        const contentWithoutHeader = removeExistingHeader(content);
        const newContent = `// ${relativePath}\n\n${contentWithoutHeader.trimStart()}`;

        await writeFile(file, newContent, {
            encoding: "utf8",
        });

        console.log(`Actualizado: ${relativePath}`);
    }

    console.log(`Archivos actualizados: ${files.length}`);
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});
