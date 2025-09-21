export interface ToastTypes {
	type: "success" | "error";
	title: string;
	description: string;
	footer?: React.ReactNode;
}
