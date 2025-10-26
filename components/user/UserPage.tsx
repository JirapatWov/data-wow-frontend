"use client";

import { Menu, useBaseStore } from "@/stores/base";
import Home from "./Home";
import MyConcert from "./MyConcert";

const UserPage = () => {
	const { menu } = useBaseStore();

	return menu === Menu.HOME ? <Home /> : <MyConcert />;
};

export default UserPage;
