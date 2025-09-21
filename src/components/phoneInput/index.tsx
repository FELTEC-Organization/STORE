import "react-phone-number-input/style.css";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

const CustomPhoneInput = forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
	<Input
		ref={ref}
		{...props}
		className={cn(
			"rounded-l-none max-h-[32px] [@media(min-width:1599px)]:h-10 h-9 border-t-0 border-r-0 border-b-0",
			className,
		)}
	/>
));
CustomPhoneInput.displayName = "CustomPhoneInput";

export default function PhoneNumberInput({
	value,
	onChange,
	error,
}: {
	value: string;
	onChange: (value: string) => void;
	error?: string;
}) {
	const { i18n } = useTranslation();

	const languageToCountry: Record<string, string> = {
		"pt": "BR",
		"pt-BR": "BR",
		"es": "MX",
		"es-MX": "MX",
		"en": "US",
		"en-US": "US",
	};

	const defaultCountry = languageToCountry[i18n.language] || "BR";

	const handleChange = (phone: string | undefined) => {
		if (phone) {
			const formatted = formatPhoneNumberIntl(phone);
			onChange(formatted);
		} else {
			onChange("");
		}
	};
	return (
		<div>
			<PhoneInput
				key={defaultCountry}
				defaultCountry={defaultCountry as any}
				value={value}
				onChange={handleChange}
				inputComponent={CustomPhoneInput}
				className={cn(
					"flex w-full items-center rounded-md border-2 border-input focus:border-nc-base-600 dark:bg-[#212121] pl-2",
					error && "border-destructive/80",
				)}
			/>
			{error && (
				<p className="mt-2 text-destructive text-[11px] 3xl:text-xs">{error}</p>
			)}

			<style>{`
		.PhoneInputCountry select {
		  color: black;
		}
	  `}</style>
		</div>
	);
}
