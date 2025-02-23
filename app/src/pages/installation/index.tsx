export default function Installation() {
  return (
    <div
      className={`flex flex-col w-screen h-screen items-center justify-center font-mono bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900`}
    >
      <div className="font-mono text-4xl flex w-full items-center justify-center bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-800 bg-clip-text text-transparent">
        <p className="font-mono">Installation Process</p>
      </div>
      <div className="w-1/2">
        <p className="text-xl italic mt-2 mb-5">
          To install and run the Decentralized Transfer Protocol (DTP) demo,
          follow these steps:
        </p>
        <p className="font-extrabold">Clone the Repository:</p>
        <p className='text-yellow-400'>
        $ git clone
        https://github.com/peter0x7f/DecentralizedTransferProtocol.git
        </p>
        <p className="font-extrabold">Navigate to the DTP Directory:</p> 
        <p className='text-yellow-400'>
        $ cd
        DecentralizedTransferProtocol/DTP
        </p>
        <p className="font-extrabold">Install Dependencies:</p>
        <p className='text-yellow-400'>
        $ pip install -r
        requirements.txt
        </p>
        <p className="font-extrabold">Run the Flask Server:</p>
        <p className='text-yellow-400'>
        $ flask --app dtp-webserver run
        </p>
        <p className="font-extrabold">Run the Client Program:</p>
        <p className='text-yellow-400'>
        $ python
        client.py
        </p>
        <p className='mt-10 italic'>
          These steps will set up and run the DTP demo on your local machine.
          For more detailed information, refer to the project's GitHub
          repository.
        </p>
      </div>
    </div>
  );
}
