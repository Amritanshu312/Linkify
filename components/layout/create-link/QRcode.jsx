"use client"
import { QRCodeSVG } from "qrcode.react";

const QRcode = () => {

  return (
    <div className="w-full h-44 rounded-md flex items-center justify-center bg-[linear-gradient(45deg,#0f1632,#0c1227,#0e1530)] border-2 border-[#181f3e]">
      <div className="h-max w-max border-2 border-[#8e9ad9] rounded-2xl p-1 bg-[#5d6985]">
        <QRCodeSVG value={"https://www.youtube.com/watch?v=QVZBl8yxVX0&t=68s"} size={130} bgColor={"#b1bffd"} fgColor={"#0d142c"} title="Linkify Link" />
      </div>
    </div>
  )
}

export default QRcode