
import React from "react";
import QRCode from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const QrCodeModal = ({ isOpen, onOpenChange, qrValue, clientName }) => {
  if (!qrValue) return null;

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code-canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-cliente-${clientName?.replace(/\s+/g, '-') || 'codigo'}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] text-center">
        <DialogHeader>
          <DialogTitle className="text-center">Código QR de Cliente</DialogTitle>
          {clientName && <DialogDescription className="text-center">Para {clientName}</DialogDescription>}
        </DialogHeader>
        <div className="my-6 flex justify-center">
          <QRCode
            id="qr-code-canvas"
            value={qrValue}
            size={256}
            level={"H"}
            includeMargin={true}
            imageSettings={{
              src: "/logo_placeholder_small.png", // Placeholder for a small logo in QR
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Este código identifica el crédito del cliente. Puede ser escaneado en el colmado para registrar consumos.
        </p>
        <Button onClick={downloadQR} className="w-full">Descargar QR</Button>
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeModal;
