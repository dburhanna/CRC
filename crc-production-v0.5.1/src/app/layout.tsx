import "./globals.css";

export const metadata = {
  title: "Curriculum Reality Check",
  description: "Connect actual instructional time to curriculum demand.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
