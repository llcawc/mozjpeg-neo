import { join } from "node:path";
import process from "node:process";
import { execa } from "execa";
//#region src/bin-wrapper.ts
/**
* Binary wrapper for platform-specific executable distribution
* Обёртка для бинарных файлов с поддержкой платформ
*/
var BinWrapper = class {
	entries = [];
	destination = "";
	binaryName = "";
	/**
	* Add a source URL for a specific OS/architecture
	* Добавить источник для определённой ОС/архитектуры
	*/
	src(url, os, arch) {
		this.entries.push({
			url,
			os,
			arch
		});
		return this;
	}
	dest(directory) {
		if (directory === void 0) return this.destination;
		this.destination = directory;
		return this;
	}
	/**
	* Set the binary name to use
	* Установить имя бинарного файла для использования
	*/
	use(binary) {
		this.binaryName = binary;
		return this;
	}
	/**
	* Find the appropriate source URL for the current platform
	* Найти подходящий URL источника для текущей платформы
	*/
	findSrc() {
		const { platform, arch } = process;
		const normalizedArch = arch === "ia32" ? "x86" : arch;
		for (const entry of this.entries) {
			const osMatch = entry.os === void 0 || entry.os === platform;
			const archMatch = entry.arch === void 0 || entry.arch === normalizedArch;
			if (osMatch && archMatch) return entry.url;
		}
		return this.entries[0]?.url;
	}
	/**
	* Get the path to the binary (either source URL or local path)
	* Получить путь к бинарному файлу (либо URL источника, либо локальный путь)
	*/
	path() {
		const src = this.findSrc();
		if (src) return src;
		if (!this.destination) throw new Error("Destination not set");
		if (!this.binaryName) throw new Error("Binary name not set");
		return join(this.destination, this.binaryName);
	}
	/**
	* Run the binary with given arguments
	* Запустить бинарный файл с указанными аргументами
	*/
	async run(args) {
		await execa(this.path(), args, { stdio: "inherit" });
	}
	/**
	* Get the binary version (not implemented for gifsicle)
	* Получить версию бинарного файла (не реализовано для gifsicle)
	*/
	version() {
		return "";
	}
};
//#endregion
export { BinWrapper };
