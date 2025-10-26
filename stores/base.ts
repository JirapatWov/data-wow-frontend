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
}));
