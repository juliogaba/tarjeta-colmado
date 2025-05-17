
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { AlertCircle, VideoOff, CheckCircle } from "lucide-react";

const QrScannerModal = ({ isOpen, onOpenChange, onScanSuccess }) => {
  const qrReaderContainerId = "qr-reader-container";
  const html5QrCodeRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isScannerInitialized, setIsScannerInitialized] = useState(false);
  const isMountedRef = useRef(true);
  const successTimeoutRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      if (html5QrCodeRef.current) {
        const html5QrCode = html5QrCodeRef.current;
        if (html5QrCode && typeof html5QrCode.stop === 'function' && html5QrCode.isScanning) {
          html5QrCode.stop().catch(err => {
            console.error("Cleanup (unmount): Error stopping scanner:", err);
          });
        }
        if (html5QrCode && typeof html5QrCode.clear === 'function') {
            html5QrCode.clear();
        }
        html5QrCodeRef.current = null; 
      }
    };
  }, []);


  useEffect(() => {
    if (isOpen) {
      setErrorMessage("");
      setSuccessMessage("");
      setIsScannerInitialized(false);

      const supportedFormats = [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.ITF,
      ];
      
      const qrReaderElement = document.getElementById(qrReaderContainerId);

      if (!qrReaderElement) {
        if (isMountedRef.current) {
          setErrorMessage("Error interno: Contenedor del escáner no se encuentra. Por favor, recargue la página.");
        }
        return;
      }

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(qrReaderContainerId, {
          verbose: false,
          formatsToSupport: supportedFormats
        });
      }
      
      const html5QrCode = html5QrCodeRef.current;

      if (!html5QrCode) {
         if (isMountedRef.current) {
            setErrorMessage("Error interno: No se pudo inicializar el objeto escáner.");
         }
         return;
      }


      const config = {
        fps: 10,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
          const boxSize = Math.floor(minEdge * 0.7);
          return { width: boxSize, height: boxSize };
        },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
      };

      const startScanner = async () => {
        try {
          if (!document.getElementById(qrReaderContainerId)) {
             if (isMountedRef.current) setErrorMessage("Error interno: Contenedor del escáner desapareció antes de iniciar.");
             return;
          }
          if (!html5QrCode || typeof html5QrCode.start !== 'function') {
             if(isMountedRef.current) setErrorMessage("Error interno: Objeto escáner no está listo para iniciar.");
             return;
          }
          
          if (html5QrCode.isScanning) {
            await html5QrCode.stop();
          }

          await html5QrCode.start(
            { facingMode: "environment" },
            config,
            (decodedText, decodedResult) => {
              if (decodedText && isMountedRef.current) {
                setSuccessMessage("¡Código escaneado con éxito!");
                
                if (typeof onScanSuccess === 'function') {
                  onScanSuccess(decodedText);
                } else {
                   console.error("QrScannerModal: onScanSuccess prop is not a function");
                }
                
                if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
                successTimeoutRef.current = setTimeout(() => {
                  if(isMountedRef.current && typeof onOpenChange === 'function') {
                     onOpenChange(false); 
                  } else if (isMountedRef.current) {
                     console.error("QrScannerModal: onOpenChange prop is not a function after scan success timeout");
                  }
                }, 500);
              }
            },
            (scanErrorMsg) => {
              if (isMountedRef.current) {
                console.warn("QrScannerModal: Scanner message (non-critical):", scanErrorMsg);
              }
            }
          );
          if (isMountedRef.current) {
            setIsScannerInitialized(true);
          }
        } catch (err) {
          console.error("QrScannerModal: Error starting Scanner:", err);
          let specificError = "No se pudo iniciar la cámara. Verifica los permisos o si otra aplicación la está usando.";
          if (err.name === "NotAllowedError") {
            specificError = "Permiso de cámara denegado. Por favor, revisa la configuración de tu navegador (usualmente junto a la URL, busca un icono de candado o cámara) y permite el acceso a la cámara para este sitio. Luego, recarga la página.";
          } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
            specificError = "No se encontró una cámara compatible. Asegúrate de que tu dispositivo tenga una cámara y esté habilitada.";
          } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
            specificError = "La cámara ya está en uso por otra aplicación o pestaña del navegador. Cierra otras aplicaciones que puedan estar usando la cámara e inténtalo de nuevo.";
          } else if (err.message && err.message.includes("QR code parse error")) {
            specificError = "Error al leer el código. Asegúrate de que el código sea claro y esté bien enfocado. Intente de nuevo.";
          }
          if (isMountedRef.current) {
            setErrorMessage(specificError);
            setIsScannerInitialized(false);
          }
        }
      };

      Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length && isMountedRef.current) {
          startScanner();
        } else if (isMountedRef.current) {
          setErrorMessage("No se detectaron cámaras en este dispositivo. Asegúrate de que tu dispositivo tenga una cámara conectada y habilitada.");
          setIsScannerInitialized(false);
        }
      }).catch(err => {
        console.error("QrScannerModal: Error getting cameras:", err);
        if (isMountedRef.current) {
          setErrorMessage("Error al acceder a las cámaras. Asegúrate de que los permisos estén concedidos en tu navegador (revisa junto a la URL).");
          setIsScannerInitialized(false);
        }
      });

    } else { 
      if (html5QrCodeRef.current) {
        const html5QrCode = html5QrCodeRef.current;
        if (html5QrCode && typeof html5QrCode.stop === 'function' && html5QrCode.isScanning) {
          html5QrCode.stop()
            .then(() => {
              if (isMountedRef.current) setIsScannerInitialized(false);
            })
            .catch(err => {
              console.error("QrScannerModal: Error stopping scanner on close:", err);
            });
        }
      }
    }
  }, [isOpen, onOpenChange, onScanSuccess]);

  const handleCloseDialog = () => {
    if (typeof onOpenChange === 'function') {
      onOpenChange(false);
    } else {
      console.error("QrScannerModal: onOpenChange prop is not a function in handleCloseDialog");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Escanear Código del Cliente</DialogTitle>
          <DialogDescription>Apunta la cámara al código QR o código de barras del cliente.</DialogDescription>
        </DialogHeader>
        
        <div id={qrReaderContainerId} className="my-4 h-64 w-full bg-gray-900 rounded-md overflow-hidden relative border-2 border-gray-700">
          {!isScannerInitialized && !errorMessage && !successMessage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <p>Iniciando escáner...</p>
            </div>
          )}
           {errorMessage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 p-4 text-center bg-black bg-opacity-75">
              <VideoOff className="h-12 w-12 mb-2" />
              <p className="text-sm font-semibold">Error de Cámara</p>
            </div>
          )}
          {successMessage && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-green-400 p-4 text-center bg-black bg-opacity-75">
              <CheckCircle className="h-12 w-12 mb-2" />
              <p className="text-sm font-semibold">{successMessage}</p>
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="mt-2 p-3 bg-red-900 border border-red-700 text-red-300 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0"/>
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
        <Button variant="outline" onClick={handleCloseDialog} className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white">
          Cancelar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default QrScannerModal;
