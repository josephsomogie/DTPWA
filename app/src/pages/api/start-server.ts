import { NextApiRequest, NextApiResponse } from "next";


let server: any = null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!server) {
      const { default: Init_DTP_Server } = await import(
        "@/new-server/server_init"
      );
      server = Init_DTP_Server();

      server.on(
        "client-approved",
        (socket: any, client_uuid: any, client_ip: any) => {
          console.log("✅ Client approved:", client_uuid);
        }
      );
      res.status(200).json({ message: "DTP Server started" });
    } else {
      res.status(200).json({ message: "Server already running" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
