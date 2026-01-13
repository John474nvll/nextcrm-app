import { getRequestConfig, requestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "de", "cz", "uk", "es"];

export default getRequestConfig(async () => {
  const locale = await requestLocale();

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
    timeZone: "Europe/Prague",
  };
});
