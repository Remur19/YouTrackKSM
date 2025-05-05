package main

import (
	"backend/transport"
	"fmt"
)

func main() {
	tp := transport.NewHTTPTransport().SetupRoutes()
	fmt.Printf("%s", tp.Start(":8088"))
}
