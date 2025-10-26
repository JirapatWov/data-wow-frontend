"use client";

import AdminPage from "@/components/admin/AdminPage";
import { Mode, useBaseStore } from "@/stores/base";

export default function Page() {
	const { mode } = useBaseStore();

	return mode === Mode.ADMIN ? <AdminPage /> : <></>;
}
