import net from "net"

const request = (url: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const [protocol, rest] = url.split("//")
        let [host, path] = rest.split("/")
        path = "/"
        let result: string;
        const socket = new net.Socket()

        socket.connect(80, host, () => {
            console.log("Connected")

            socket.write(`GET ${path} HTTP/1.1\r\nHost: ${"example.org"}\r\n\r\n`);
        })

        socket.on('data', (data) => {
            result += data
            socket.end()
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
            const [headers, body] = result.split("\r\n\r\n")
            resolve([headers, body])
        })
    })

    
}

const show = (body: string) => {
    let in_angle = false
    for (let i = 0; i < body.length; i++) {
        if (body[i] == "<") {
            in_angle = true
        } else if (body[i] == ">") {
            in_angle = false
        } else if (!in_angle) {
            process.stdout.write(body[i])
        }
    }
}

const load = async (url: string) => {
    const [headers, body] = await request(url);
    show(body)
}

(async () => {
    await load(process.argv[2])
})()
