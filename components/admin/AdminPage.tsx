"use client";

import { Menu, useBaseStore } from "@/stores/base";
import Home from "./Home";

const AdminPage = () => {
	const { menu } = useBaseStore();

	return menu === Menu.HOME ? <Home /> : <></>;
};

export default AdminPage;
