from tkinter import *
import psutil
import platform
import socket

root = Tk()
#C = Frame(root, bg="#ebebe0", height=500, width=1000)
net_io = psutil.net_io_counters()
def get_size(bytes, suffix="B"):
    factor = 1024
    for unit in ["", "K", "M", "G", "T", "P"]:
        if bytes < factor:
            return f"{bytes:.2f}{unit}{suffix}"
        bytes /= factor

def hardware_data():
    var1 = StringVar()
    var2 = StringVar()
    var3 = StringVar()
    var4 = StringVar()
    var5 = StringVar()

    uname = platform.uname()
    var1.set(f"System: {uname.system}")
    var2.set(f"Node Name: {uname.node}")
    var3.set(f"Release: {uname.release}")
    var4.set(f"Version: {uname.version}")
    var5.set(f"System: {uname.system}")
    
    label1 = Label( root, textvariable=var1,anchor=W,justify=LEFT, width=50)
    label1.pack()
    label2 = Label( root, textvariable=var2,anchor=W,justify=LEFT, width=50)
    label2.pack()
    label3 = Label( root, textvariable=var3,anchor=W,justify=LEFT, width=50)
    label3.pack()
    label4 = Label( root, textvariable=var4,anchor=W,justify=LEFT, width=50)
    label4.pack()
    label5 = Label( root, textvariable=var5,anchor=W,justify=LEFT, width=50)
    label5.pack()


def network_data():              
    var11 = StringVar()
    var12 = StringVar()
    var13 = StringVar()
    var14 = StringVar()
    var15 = StringVar()
    var16 = StringVar()
    var17 = StringVar()
    if_addrs = psutil.net_if_addrs()
    for interface_name, interface_addresses in if_addrs.items():
        for address in interface_addresses:
                label12 = Label( root, textvariable=var12,anchor=W,justify=LEFT, width=50)
                label13 = Label( root, textvariable=var13,anchor=W,justify=LEFT, width=50)
                label14 = Label( root, textvariable=var14,anchor=W,justify=LEFT, width=50)      
                label15 = Label( root, textvariable=var15,anchor=W,justify=LEFT, width=50)
                label16 = Label( root, textvariable=var16,anchor=W,justify=LEFT, width=50)
                label17 = Label( root, textvariable=var17,anchor=W,justify=LEFT, width=50)
    var12.set((socket.gethostbyname(socket.gethostname())))
    label12.pack()          
    var13.set(f"  Netmask: {address.netmask}")
    label13.pack()
    var14.set(f"  File system type: {fstype}")
    label14.pack()
    var15.set(f"  MAC Address: {address.address}")
    label15.pack()
    var16.set(f"Total Bytes Sent: {get_size(net_io.bytes_sent)}")
    label16.pack()
    var17.set(f"Total Bytes Received: {get_size(net_io.bytes_recv)}")
    label17.pack()

    

hardware_data()
network_data()



#C.pack()
root.mainloop()

print("="*40, "Disk Information", "="*40)
print("Partitions and Usage:")
# get all disk partitions


partitions = psutil.disk_partitions()
for partition in partitions:
    print(f"=== Device: {partition.device} ===")
    print(f"  Mountpoint: {partition.mountpoint}")
    print(f"  File system type: {partition.fstype}")
    try:
        partition_usage = psutil.disk_usage(partition.mountpoint)
    except PermissionError:
        # this can be catched due to the disk that
        # isn't ready
        continue
    print(f"  Total Size: {get_size(partition_usage.total)}")
    print(f"  Used: {get_size(partition_usage.used)}")
    print(f"  Free: {get_size(partition_usage.free)}")
    print(f"  Percentage: {partition_usage.percent}%")
# get IO statistics since boot



disk_io = psutil.disk_io_counters()
print(f"Total read: {get_size(disk_io.read_bytes)}")
print(f"Total write: {get_size(disk_io.write_bytes)}")
