import net from "net"

const request = (url: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const [protocol, rest] = url.split("/")[0]
        console.log(rest)
        let [host, path] = rest.split("/")
        path = "/"
        let result;

        const socket = new net.Socket()

        socket.connect(80, "example.org", () => {
            console.log("Connected")
            console.log(`GET ${path} HTTP/1.1\r\nHost: ${"example.org"}\r\n\r\n`)

            socket.write(`GET ${path} HTTP/1.1\r\nHost: ${"example.org"}\r\n\r\n`);
        })

        socket.on('data', (data) => {
            console.log(`Received data from server: ${data}`);
            result += data
        });
        
        socket.on('close', () => {
            console.log('Connection closed.');
            
        });

        socket.on('error', (err) => {
            console.error(`Error: ${err}`);
            reject(err)
        })

        socket.on('end', () => {
            console.log('Socket ended');
            resolve(["headers", result])
        })
    })

    
}

const show = (body: string) => {
    console.log("BODY: " + body)
}

const load = async (url: string) => {
    const [headers, body] = await request(url);
    show(body)
}

(async () => {
    await load(process.argv[2])
})()
