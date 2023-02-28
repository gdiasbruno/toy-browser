const request = (url: string) => {
    const [scheme]
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