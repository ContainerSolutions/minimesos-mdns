# minimesos-mdns
Service for publishing minimesos containers via mdns

# Usage

`$ npm install`
`$ ./minimesos-mdns`

Now start a minimesos cluster. Their containers will be registered with Avahi.

# TODO

* Prevent duplicate registration
* Parse cluster name and add to addresss
* Add support for `dns-sd` on Mac
* Add tests
* Code style

