import { create } from "zustand";

export enum Mode {
	USER,
	ADMIN,
}

export enum Menu {
	HOME,
	HISTORY,
}

interface BaseState {
	mode: Mode;
	switchMode: () => void;
	menu: Menu;
	setMenu: (menu: Menu) => void;
	isRefetch: boolean;
	setIsRefetch: (isRefetch: boolean) => void;
}

export const useBaseStore = create<BaseState>((set) => ({
	mode: Mode.ADMIN,
	switchMode: () =>
		set((state) => ({
			mode: state.mode === Mode.ADMIN ? Mode.USER : Mode.ADMIN,
		})),
	menu: Menu.HOME,
	setMenu: (menu: Menu) =>
		set(() => ({
			menu: menu,
		})),
	isRefetch: false,
	setIsRefetch: (isRefetch: boolean) =>
		set(() => ({
			isRefetch: isRefetch,
		})),
}));
