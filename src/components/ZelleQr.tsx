"use client";

import { useState } from "react";
import { paymentPage } from "@/data/content";

export function ZelleQr() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="text-center border border-rule p-8 md:p-10 mb-8">
      <div className="w-44 h-44 mx-auto mb-4 border border-dashed border-rule-strong bg-surface flex items-center justify-center overflow-hidden">
        {!errored ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/${paymentPage.zelleQr}`}
            alt="Zelle QR code"
            className="w-full h-full object-contain"
            onError={() => setErrored(true)}
          />
        ) : (
          <p className="text-[11.5px] text-ink-faint px-4 leading-[1.6]">
            Replace {paymentPage.zelleQr}
            <br />
            with your Zelle QR code
          </p>
        )}
      </div>
      <p className="text-[12.5px] text-ink-faint">{paymentPage.zelleNote}</p>
    </div>
  );
}
