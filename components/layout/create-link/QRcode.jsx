import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

const QRcode = () => {
  const qrRef = useRef(null);

  const downloadAsImage = (format = "png") => {
    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svg.clientWidth;
      canvas.height = svg.clientHeight;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff"; // Optional: Set background for JPG
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const imageUrl = canvas.toDataURL(`image/${format}`);

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `qr-code.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="w-full h-44 rounded-md flex items-center justify-center relative overflow-hidden bg-[linear-gradient(45deg,#0f1632,#0c1227,#0e1530)] border-2 border-[#181f3e]">
      <div className="h-max w-max border-2 border-[#8e9ad9] rounded-2xl p-1 bg-[#5d6985] cursor-pointer group">
        <QRCodeSVG value={"https://www.youtube.com/watch?v=QVZBl8yxVX0&t=68s"} size={130} bgColor={"#b1bffd"} fgColor={"#0d142c"} title="Linkify Link" ref={qrRef} />
        <div className="w-full h-full absolute top-0 left-0 bg-[#0e142d91] backdrop-blur-[10px] opacity-0 group-hover:opacity-100 duration-300 flex items-center justify-center">
          <div className="bg-[#131d46] border border-[#ffffff25] px-2.5 py-2 rounded-lg cursor-pointer" onClick={() => downloadAsImage()}>Download QR Code</div>
        </div>
      </div>
    </div>
  )
}

export default QRcode