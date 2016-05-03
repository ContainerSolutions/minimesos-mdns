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

The containers will be registered with Avahi.

```
Publishing zookeeper.mycluster.local as 172.17.0.3
Publishing master.mycluster.local as 172.17.0.4
Publishing agent.mycluster.local as 172.17.0.5
Publishing marathon.mycluster.local as 172.17.0.6
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

