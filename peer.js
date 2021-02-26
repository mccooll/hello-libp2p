const Libp2p = require('libp2p');
const TCP = require('libp2p-tcp');
const { NOISE } = require('libp2p-noise');
const MPLEX = require('libp2p-mplex');
const multiaddr = require('multiaddr');
const process = require('process');
//const { pipeline } = require('stream');
const pipe = require('it-pipe');
const concat = require('it-concat');

const main = async () => {
    const peer = await Libp2p.create({
        addresses: {
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        modules: {
            transport: [TCP],
            connEncryption: [NOISE],
            streamMuxer: [MPLEX]
        }
    })

    await peer.start();
    console.log('start');

    console.log('listening');
    peer.multiaddrs.forEach(addr => console.log(`${addr.toString()}/p2p/${peer.peerId.toB58String()}`));

    peer.handle('/zoppy', async ({stream, connection}) => {
        const input = await pipe(
            stream,
            concat
        );
        console.log(input.toString());
        console.log(connection.remoteAddr);
        console.log(connection.remotePeer.toB58String());
    });

    //peer.handle('/zopped')

    console.log('ping try');
    process.argv[2] ? console.log(await peer.ping(multiaddr(process.argv[2]))) : console.log('not pinging');

    if(process.argv[2]) {
        console.log('send unencrypted data');
        const { stream } = await peer.dialProtocol(multiaddr(process.argv[2]), '/zoppy');
        await pipe(
            ['Hello p2p', ' ', 'world!'],
            stream
        );
    }

    const stop = async () => {
        // stop libp2p
        await peer.stop()
        console.log('libp2p has stopped')
        process.exit(0)
      }
      
    process.on('SIGTERM', stop);
    process.on('SIGINT', stop);
}
main();