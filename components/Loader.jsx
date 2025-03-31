import Image from "next/image"

const Loader = () => {
  return (
    <div className="w-full h-screen grid place-content-center">
      <img src="/images/loaders/loader-1.svg" alt="" className="w-52" />
    </div>
  )
}

export default Loader