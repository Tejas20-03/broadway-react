import "./globals.css";
import 'framework7/css/bundle';
import 'framework7/css';
import type { Metadata } from "next";
import Header from "@/components/Layout/Header/Header";
import { Poppins } from "next/font/google";
import { Providers } from "../redux/Provider";
import NextTopLoader from "nextjs-toploader";
import { colors } from "@/constant/Colors";
import Head from "next/head";
import Script from "next/script";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Broadway Pizza",
  description:
    "Broadway Pizza is offering online ordering services in Pakistan. Order now and get amazing discounts and coupons on pizza deals and other fast food.",
  icons: {
    icon: ["/Assets/broadwayPizzaLogo.png"],
    apple: ["/favicon.ico"],
    shortcut: ["/favicon.ico"],
  },
  // manifest: "/manifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <html lang="en" suppressHydrationWarning>
          <body className={`${poppins.className} ${poppins.variable}`} suppressHydrationWarning>
            <NextTopLoader color={colors.primary} height={6} />
            <Header />
            {children}
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-DLCLS7RYH8"
            />
            <Script id="G-DLCLS7RYH8" strategy="beforeInteractive" async>
              {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DLCLS7RYH8');`}
            </Script>
            {/* Face book script tag */}

            <Script strategy="beforeInteractive" id="facebook-pixel" defer>
              {`
               !function(f,b,e,v,n,t,s)
               {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
               n.callMethod.apply(n,arguments):n.queue.push(arguments)};
               if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
               n.queue=[];t=b.createElement(e);t.async=!0;
               t.src=v;s=b.getElementsByTagName(e)[0];
               s.parentNode.insertBefore(t,s)}(window, document,'script',
               'https://connect.facebook.net/en_US/fbevents.js');
               fbq('init', '2659477467398561');
               fbq('track', 'PageView');
            `}
            </Script>

            {/* Twak to script tag */}
            {/* <Script
              strategy="beforeInteractive"
              async
              style={{ display: "none" }}
            >
              {`var Tawk_API = Tawk_API || {}, Tawk_Loadstart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/58df762ff97dd14875f5b241/default';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_API.customStyle = {
            zIndex : 10000
        };`}
            </Script> */}

            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=2659477467398561&ev=PageView&noscript=1"
              />
            </noscript>
          </body>
        </html>
      </Providers>
    </>
  );
}
