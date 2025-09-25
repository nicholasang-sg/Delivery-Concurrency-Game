#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>

#include <iostream>

// Define the server type using the asio_no_tls configuration
typedef websocketpp::server<websocketpp::config::asio> server;

// Define a connection handle type
typedef websocketpp::connection_hdl connection_hdl;

class EchoServer {
public:
    EchoServer() {
        // Set logging settings
        m_endpoint.set_error_channels(websocketpp::log::elevel::all);
        m_endpoint.set_access_channels(websocketpp::log::alevel::all ^ websocketpp::log::alevel::frame_payload);

        // Initialize Asio
        m_endpoint.init_asio();

        // Set the message handler to the echo_handler method
        m_endpoint.set_message_handler(std::bind(
            &EchoServer::echo_handler,
            this,
            std::placeholders::_1,
            std::placeholders::_2
        ));
    }

    // Message handler to echo received messages
    void echo_handler(connection_hdl hdl, server::message_ptr msg) {
        std::cout << "Received message: " << msg->get_payload() << std::endl;
        // Send the received message back to the client
        m_endpoint.send(hdl, msg->get_payload(), msg->get_opcode());
    }

    // Run the server
    void run(uint16_t port) {
        // Listen on the specified port
        m_endpoint.listen(port);

        // Queue a connection accept operation
        m_endpoint.start_accept();

        // Start the Asio io_service run loop
        m_endpoint.run();
    }

private:
    server m_endpoint;
};

int main() {
    EchoServer s;
    std::cout << "Starting WebSocket server on port 9002..." << std::endl;
    s.run(9002);
    return 0;
}