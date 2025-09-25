add_definitions(-DASIO_STANDALONE)
add_definitions(-D_WEBSOCKETPP_CPP11_THREAD_)
add_definitions(-D_WEBSOCKETPP_CPP11_STRICT_)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

cmake_minimum_required(VERSION 3.10)
project(DeliveryConcurrencyServer)

add_executable(DeliveryConcurrencyServer src/main.cpp)

# Add websocketpp include directory
target_include_directories(DeliveryConcurrencyServer PRIVATE ${CMAKE_SOURCE_DIR}/referencedLibraries/websocketpp)

# Add asio include directory (assuming standalone asio in this path)
target_include_directories(DeliveryConcurrencyServer PRIVATE "C:/vcpkg/installed/x64-windows/include")



# previous version 1.0 code below:

# cmake_minimum_required(VERSION 3.10.0)
# project(DeliveryConcurrencyServer)
# set( CMAKE_CXX_COMPILER "C:\\msys64\\mingw64\\bin\\g++.exe" )
# add_executable(DeliveryConcurrencyServer src/main.cpp)
#
# include_directories(${CMAKE_SOURCE_DIR}/referencedLibraries/websocketpp)
# include_directories(C:/vcpkg/installed/x64-windows/share/asio)
