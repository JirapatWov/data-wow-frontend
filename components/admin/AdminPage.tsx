"use client";

import { Menu, useBaseStore } from "@/stores/base";
import Home from "./Home";
import History from "./History";

const AdminPage = () => {
	const { menu } = useBaseStore();

	return menu === Menu.HOME ? <Home /> : <History />;
};

export default AdminPage;
