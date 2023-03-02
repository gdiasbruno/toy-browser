import net from "net"

const request = (url: string) => {
    const [protocol, rest] = url.split("/")[0]
    let [host, path] = rest.split("/")
    path = "/" + path

    const socket = new net.Socket()

    socket.connect(80, "example.org", () => {
        console.log("Connected")

        socket.write(`GET ${path} HTTP/1.1\r\n`)
    })

    socket.on('data', (data) => {
        console.log(`Received data from server: ${data}`);
      });
      
    socket.on('close', () => {
        console.log('Connection closed.');
    });

    return ["headers", "body"]
}

const show = (body: string) => {
    console.log("BODY: " + body)
}

const load = (url: string) => {
    const [headers, body] = request(url)
    show(body)
}

load(process.argv[2])