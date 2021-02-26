const Libp2p = require('libp2p');
const TCP = require('libp2p-tcp');
const { NOISE } = require('libp2p-noise');
const MPLEX = require('libp2p-mplex');
const multiaddr = require('multiaddr');
const process = require('process');

const main = async () => {
    const peer = await Libp2p.create({
        addresses: {
            listen: ['/ip4/127.0.0.1/tcp/0']
        },
        modules: {
            transport: [TCP],
            connEncryption: [NOISE],
            streamMuxer: [MPLEX]
        }
    })

    await peer.start();
    console.log('start');

    console.log('listen');
    peer.multiaddrs.forEach(addr => console.log(`${addr.toString()}/p2p/${peer.peerId.toB58String()}`));

    console.log('ping try');
    process.argv[2] ? console.log(await peer.ping(multiaddr(process.argv[2]))) : console.log('not pinging');

    const stop = async () => {
        // stop libp2p
        await peer.stop()
        console.log('libp2p has stopped')
        process.exit(0)
      }
      
      process.on('SIGTERM', stop)
      process.on('SIGINT', stop)
}
main();