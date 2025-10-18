import os
import json
import logging
import socketserver
import socket
import time

HOST, PORT = "localhost", 666

# Create a socket (SOCK_STREAM means a TCP socket)
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
    # # Connect to server and send data
    # sock.connect((HOST, PORT))
    
    # match(predictor_type):
    #     case "muscles_low":
    #         predictor_code = 12
    #     case "muscles_high":
    #         predictor_code = 14
    #     case "implants_low":
    #         predictor_code = 15
    #     case "implants_high":
    #         predictor_code = 16
    #     case _:
    #         predictor_code = 0
    
    # code = 10
    # code = code.to_bytes(8)
    # predictor_code = predictor_code.to_bytes(8)
    # sock.sendall(necessary_bs + code + predictor_code)
    # print("predictor sent")
    
    # code = int.from_bytes(sock.recv(8))
    # print("predictor loaded")

    sock.sendto("get info".encode(encoding="utf-8"), ("127.0.0.1", 4149))
    l = 10000
    result = sock.recvfrom(l, 0)
    print(result[0].decode(encoding="utf-8"))
    
    sock.close()

# with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
#     sock.connect((HOST, PORT))
    
#     code = 100
#     code = code.to_bytes(8)
#     length = os.path.getsize(CT_scan_file).to_bytes(8)
#     with open(CT_scan_file, "rb") as f:
#         CT_scan_file = f.read()

#     sock.sendall(necessary_bs + code + length + CT_scan_file)
#     print("data sent")
    
#     buffer_file = open("./result.nii.gz", "w+b")
    
#     code = int.from_bytes(sock.recv(8))
#     length = int.from_bytes(sock.recv(8))
#     CT_scan_file = bytes()
#     while len(CT_scan_file) < length:
#         CT_scan_file += sock.recv(length)
#     print("response received")
    
#     buffer_file.write(CT_scan_file)
#     buffer_file.close()
    
#     sock.close()