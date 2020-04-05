from tkinter import *
import psutil
import platform
import socket

root=Tk()
photo1 = PhotoImage(file="system_details.png")
Button1 =Button(root, image = photo1)
photo2 = PhotoImage(file="network_details.png")
Button2 =Button(root, image = photo2)
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



hardware_data()

root.mainloop()
