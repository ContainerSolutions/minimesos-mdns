# minimesos-mdns
Service for publishing minimesos containers via mdns

# Usage

```
$ npm install
$ ./minimesos-mdns
```

Now start a minimesos cluster in a separate terminal.

```
$ minimesos init
$ minimesos up

```

The containers will be published to Avahi.

```
Publishing zookeeper.mycluster.local as 172.17.0.3
Publishing master.mycluster.local as 172.17.0.4
Publishing agent.mycluster.local as 172.17.0.5
Publishing marathon.mycluster.local as 172.17.0.6
```

and they can be accessed via their .local address.

```
$ curl -s agent.mycluster.local:5051/state.json | jq .version
"0.25.0"
$ curl -s agent.mycluster.local:5051/state.json | jq .version
"0.25.0"
$ curl -s master.mycluster.local:5050/state.json | jq .version
"0.25.0"
$ ping -c 1 zookeeper.mycluster.local
PING zookeeper.mycluster.local (172.17.0.3) 56(84) bytes of data.
64 bytes from zookeeper.mycluster.local (172.17.0.3): icmp_seq=1 ttl=64 time=0.042 ms

--- zookeeper.mycluster.local ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 0.042/0.042/0.042/0.000 ms
$ curl -s marathon.mycluster.local:8080/v2/apps | jq
{
  "apps": []
}
```

# TODO

* Prevent duplicate registration
* Parse cluster name and add to addresss
* Add support for `dns-sd` on Mac
* Add tests
* Code style

# Get in touch

* @minimesos
* @Frank_Scholten
* @containersoluti

