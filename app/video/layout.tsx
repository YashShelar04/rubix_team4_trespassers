import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className="dark">
      <body
      
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
