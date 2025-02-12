export default function About() {
  return (
    <div
      className={`flex flex-col w-screen h-screen items-center justify-center font-mono`}
    >
      <div className="font-mono text-4xl flex w-full items-center justify-center bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-800 bg-clip-text text-transparent">
        <p>About DTP</p>
      </div>
      <div className="w-1/2">
        <p className="text-xl italic mt-2">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
      </div>
    </div>
  );
}
