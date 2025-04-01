import { NextApiRequest, NextApiResponse } from 'next';


let server :any = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!server) {
        const { default: Init_DTP_Server } = await import(
          "@/new-server/server_init"
        );
        server = Init_DTP_Server();
    }

    const { client_uuid, key, value } = req.body;

    if (!client_uuid || !key || !value) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const socket = server.clients.get(client_uuid);
    if (!socket) return res.status(404).json({ error: 'Client not connected' });

    await server.WriteValue(socket, {
      client_uuid,
      client_ip: socket.remoteAddress,
      client_port: socket.remotePort,
      server_uuid: server.uuid,
      server_ip: server.host,
      data_key: key,
      data_value: value,
    }, server.dbAdapter);

    return res.status(200).json({ message: 'WRITE_VALUE sent' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
