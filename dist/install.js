import { bin as binWrapper } from "./index.js";
import process from "node:process";
import { execa } from "execa";
import fs from "node:fs";
//#region src/install.ts
/**
* Checks if a file exists at the given path.
* Проверяет, существует ли файл по указанному пути.
*/
function fileExists(filePath) {
	try {
		return fs.existsSync(filePath);
	} catch {
		return false;
	}
}
/**
* Makes a binary file executable on Unix-like systems.
* Устанавливает права на выполнение для бинарного файла на Unix-подобных системах.
* @param binaryPath Path to the binary file / Путь к бинарному файлу
*/
async function makeExecutable(binaryPath) {
	if (process.platform === "win32") return;
	try {
		await execa("chmod", ["+x", binaryPath]);
		console.log(`Set executable permissions for ${binaryPath}`);
	} catch (error) {
		console.warn(`Failed to set executable permissions: ${error instanceof Error ? error.message : String(error)}`);
	}
}
/**
* Ensures the binary is available and executable.
* Throws an error if the binary is missing.
* On Unix systems, sets executable permissions if needed.
* Проверяет доступность бинарного файла и его исполняемость.
* Если файл отсутствует, выбрасывает ошибку.
* На Unix-системах устанавливает права на выполнение при необходимости.
*/
async function ensureBinaryExecutable() {
	const binaryPath = binWrapper.path();
	if (!fileExists(binaryPath)) throw new Error(`Binary not found at ${binaryPath}. Pre-built binary may be missing for this platform.`);
	if (process.platform !== "win32") try {
		if (!((fs.statSync(binaryPath).mode & 73) !== 0)) {
			console.warn(`Binary ${binaryPath} is not executable, fixing permissions`);
			await makeExecutable(binaryPath);
		}
	} catch (error) {
		console.warn(`Could not check executable permissions: ${error instanceof Error ? error.message : String(error)}`);
	}
}
/**
* Main installation process: checks for pre-built binary,
* sets executable permissions, and tests its functionality.
* Основной процесс установки: проверяем наличие предварительно собранного бинарника,
* устанавливаем права на выполнение и тестируем его работоспособность.
*/
async function install() {
	try {
		await ensureBinaryExecutable();
		console.log("Pre-built binary found and ready");
	} catch (error) {
		console.error(`Failed to ensure binary: ${error instanceof Error ? error.message : String(error)}`);
		process.exit(1);
	}
	try {
		await binWrapper.run(["-version"]);
		console.log("mozjpeg pre-build test passed successfully");
	} catch (error) {
		console.error("mozjpeg pre-build test failed:", error instanceof Error ? error.message : String(error));
		console.error("The pre-built binary may be incompatible with this system.");
		process.exit(1);
	}
}
install().catch((error) => {
	console.error("Installation failed:", error instanceof Error ? error.message : String(error));
	process.exit(1);
});
//#endregion
export { ensureBinaryExecutable, install };
