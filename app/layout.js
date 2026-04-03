export const metadata = {
  title: "Tg Member Retention Miniapp",
  description: "Mini app for member status guidance"
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
