import "./globals.css";

export const metadata = {
  title: "Vision Board",
  description: "Interactive yearly goals with adaptive check ins"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
