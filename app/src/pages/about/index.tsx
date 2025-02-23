export default function About() {
  return (
    <div
      className={`flex flex-col w-screen h-screen items-center justify-center font-mono bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900`}
    >
      <div className="font-mono text-4xl flex w-full items-center justify-center bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-800 bg-clip-text text-transparent">
        <p className='font-mono'>About DTP</p>
      </div>
      <div className="w-1/2">
        <p className="text-xl italic mt-2">
        The Decentralized Transfer Protocol (DTP) is designed to help applications decentralize user data storage, thereby reducing the operational costs of running web applications and enhancing user privacy. By decentralizing data storage, DTP aims to distribute the responsibility of data management across multiple nodes, minimizing reliance on centralized servers. This approach not only lowers infrastructure expenses but also bolsters data security by mitigating single points of failure. Additionally, DTP emphasizes stringent privacy standards, ensuring that user data remains confidential and protected throughout its lifecycle.
        </p>
      </div>
    </div>
  );
}
