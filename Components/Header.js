function Header() {
  return (
    <>
      <div className="h-20">
        <div className="flex justify-between items-center max-w-[1070px] w-full h-full m-auto px-6 py-0">
          <figure className="max-w-[200px]">
            <img
              className="w-full h-full"
              src="https://summarist.vercel.app/_next/static/media/logo.1b1c490b.png"
              alt="logo"
            />
          </figure>
          <ul className="list-none flex gap-6">
            <li className="cursor-pointer hover:text-green-400">Login</li>
            <li className=" hover:text-green-400 cursor-not-allowed">About</li>
            <li className=" hover:text-green-400 cursor-not-allowed">
              Contact
            </li>
            <li className=" hover:text-green-400 cursor-not-allowed">Help</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
