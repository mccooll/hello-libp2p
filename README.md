# hello-libp2p

Run on two different machines on the same network. To install clone the repository and ```npm install```.

On the first machine run ```node peer.js```.

You should see output similar to:

```
start
listening
/ip4/127.0.0.1/tcp/52726/p2p/QmY8bkt7Fd4NoB79ya2pawh4KwQmFwdecrej2EcZMDHSqq
/ip4/192.168.1.9/tcp/52726/p2p/QmY8bkt7Fd4NoB79ya2pawh4KwQmFwdecrej2EcZMDHSqq
/ip4/192.168.1.8/tcp/52726/p2p/QmY8bkt7Fd4NoB79ya2pawh4KwQmFwdecrej2EcZMDHSqq
ping try
not pinging
```

Start the second machine by copying the last output multiaddr and pasting as a parameter to the node command.
For example: 
```
node peer.js /ip4/192.168.1.8/tcp/52726/p2p/QmY8bkt7Fd4NoB79ya2pawh4KwQmFwdecrej2EcZMDHSqq
```

You should then see output on the first machine:
```
receiving uncompressed data
Hello p2p world!
send compressed data
```
and on the second machine:
```
start
listening
/ip4/127.0.0.1/tcp/63899/p2p/QmQXuQtAGbd7EXyZUJZhsYgd1sJvFoED9GXMU6NYRyW1d7
/ip4/192.168.1.11/tcp/63899/p2p/QmQXuQtAGbd7EXyZUJZhsYgd1sJvFoED9GXMU6NYRyW1d7
/ip4/192.168.1.3/tcp/63899/p2p/QmQXuQtAGbd7EXyZUJZhsYgd1sJvFoED9GXMU6NYRyW1d7
ping try
9
send uncompressed data
receive compressed data
�H���W(0*P(�/�IQ
                $q{
```
Use ctrl+c to exit the peer processes. Enjoy!
