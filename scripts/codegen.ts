import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_SOURCE = "src";
const DEFAULT_OUTPUT_NAME = "total_code.txt";

const OUTPUT_DIR = ".development/codegen";
const TARGET_EXTENSIONS = new Set([".ts", ".tsx"]);

function getArgValue(index: number): string | undefined {
    return process.argv[index];
}

function ensureTxtExtension(name: string): string {
    return path.extname(name) === "" ? `${name}.txt` : name;
}

function toPosixPath(value: string): string {
    return value.split(path.sep).join("/");
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

    return files.sort((a, b) => a.localeCompare(b));
}

async function main(): Promise<void> {
    const root = process.cwd();

    const source = getArgValue(2) ?? DEFAULT_SOURCE;
    const outputName = ensureTxtExtension(
        getArgValue(3) ?? DEFAULT_OUTPUT_NAME,
    );

    const sourcePath = path.resolve(root, source);
    const outputDir = path.resolve(root, OUTPUT_DIR);
    const outputPath = path.join(outputDir, outputName);

    if (!(await pathExists(sourcePath))) {
        console.error(`[ERROR] El path de origen "${source}" no existe.`);

        process.exitCode = 1;

        return;
    }

    await mkdir(outputDir, {
        recursive: true,
    });

    const files = await getSourceFiles(sourcePath);
    const chunks: string[] = [];

    for (const file of files) {
        const relativePath = toPosixPath(path.relative(root, file));
        const content = await readFile(file, "utf8");

        chunks.push(`\n===== ${relativePath} =====\n${content}\n`);
    }

    await writeFile(outputPath, chunks.join("\n"), {
        encoding: "utf8",
    });

    console.log(
        `Archivo generado: ${toPosixPath(path.relative(root, outputPath))}`,
    );
    console.log(`Archivos incluidos: ${files.length}`);
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});
