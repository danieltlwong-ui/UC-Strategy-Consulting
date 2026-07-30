"use client";

import { useState } from "react";
import { brand, paymentPage } from "@/data/content";

export function ZelleQr() {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className="mb-10 w-full px-8 py-11 md:px-14 md:py-14"
      style={{ background: "#faf8f1", color: "#20242e" }}
    >
      <div className="text-center mb-8">
        <span
          className="font-mono text-[11px] tracking-[0.16em] uppercase"
          style={{ color: "#9c7b1c" }}
        >
          Payment Method
        </span>
        <h3 className="font-serif italic font-semibold text-[30px] md:text-[34px] leading-[1.15] mt-3 mb-3">
          Pay securely with Zelle
        </h3>
        <p className="text-[15px] leading-[1.6]" style={{ opacity: 0.7 }}>
          Scan the QR code using your banking app
        </p>
      </div>

      <div
        className="w-56 h-56 md:w-64 md:h-64 mx-auto mb-8 flex items-center justify-center overflow-hidden bg-white"
        style={{ border: "1px solid rgba(32,36,46,0.14)" }}
      >
        {!errored ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/${paymentPage.zelleQr}`}
            alt="Zelle QR code"
            className="w-full h-full object-contain"
            onError={() => setErrored(true)}
          />
        ) : (
          <p className="text-[12px] px-4 text-center leading-[1.5]" style={{ opacity: 0.6 }}>
            Replace {paymentPage.zelleQr}
            <br />
            with your Zelle QR code
          </p>
        )}
      </div>

      <div
        className="pt-6 text-[14.5px] leading-[1.6] text-center"
        style={{ borderTop: "1px solid rgba(32,36,46,0.1)" }}
      >
        <p className="font-semibold">
          Memo — include the student&rsquo;s name and selected service
        </p>
      </div>

      <p className="text-center text-[13px] mt-6" style={{ opacity: 0.65 }}>
        Booking is confirmed after payment is received
      </p>

      <p
        className="text-center text-[12px] mt-5 pt-5"
        style={{ opacity: 0.55, borderTop: "1px solid rgba(32,36,46,0.08)" }}
      >
        Can&rsquo;t scan a QR code? Email {brand.contactEmail} and we&rsquo;ll send the Zelle details
        directly.
      </p>
    </div>
  );
}
