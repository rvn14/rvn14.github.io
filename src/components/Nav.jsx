import CircularText from "./CircularText"

const Nav = () => {
  return (
    <nav className="absolute w-full flex items-center justify-center p-4 bg-transparent z-20">
      <div className="flex items-center -mt-25">
        <div className="w-40 h-40 bg-white/5 backdrop-blur-[1px] outline-1 outline-white/30 rounded-full flex items-center justify-center">
          <CircularText
            text="RVN14 ◉ RVN14 ◉ RVN14 ◉ RVN14 ◉ "
            onHover="speedUp"
            spinDuration={20}
            className="text-white font-mono"
            />
        </div>
      </div>
    </nav>
  )
}

export default Nav