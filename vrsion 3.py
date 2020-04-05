import tkinter
import psutil
import platform
import socket
#import re, uuid 

root = Tk()
#C = Frame(root, bg="#ebebe0", height=500, width=1000)

#buttons & lables 
photo1 = PhotoImage(file="system_details.png")
Button1 =Button(root, image = photo1)
photo2 = PhotoImage(file="network_details.png") 
Button2 =Button(root, image = photo2)

net_io = psutil.net_io_counters()
#definatons
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
    var1.set(f"System Type : {uname.system}")
    var2.set(f"Username : {uname.node}")
    var3.set(f"Windows Type : {uname.release}")
    var4.set(f"Version : {uname.version}")
    var5.set(f"Processor : {uname.processor}")
    
    label1 = Label( root, textvariable=var1,anchor=W,justify=LEFT, height = 0, width=40)
    label2 = Label( root, textvariable=var2,anchor=W,justify=LEFT, height = 0,width=40)
    label3 = Label( root, textvariable=var3,anchor=W,justify=LEFT, height = 0,width=40)
    label4 = Label( root, textvariable=var4,anchor=W,justify=LEFT, height = 0,width=40)
    label5 = Label( root, textvariable=var5,anchor=W,justify=LEFT, height = 0,width=40)

    Button1.grid(row=0,column=0,rowspan=5)
    label1.grid(row=0,column=1)
    label2.grid(row=1,column=1)
    label3.grid(row=2,column=1)
    label4.grid(row=3,column=1)
    label5.grid(row=4,column=1)
    
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
    var12.set(f"IP address : {(socket.gethostbyname(socket.gethostname()))}")        
    var13.set(f"MAC Address: {.join(re.findall('..', '%012x' % uuid.getnode()))}")   
    var14.set(f"File system type: ")    
    var15.set(f" MAC Address: {address.address}")    
    var16.set(f"Total Bytes Sent : {get_size(net_io.bytes_sent)}")    
    var17.set(f"Total Bytes Received : {get_size(net_io.bytes_recv)}")
    
    Button2.grid(row=0,column=2,rowspan=6)
    label12.grid(row=0,column=3)
    label13.grid(row=1,column=3)  
    label14.grid(row=2,column=3)
    label15.grid(row=3,column=3)
    label16.grid(row=4,column=3)
    label17.grid(row=5,column=3)


hardware_data()
root.mainloop()