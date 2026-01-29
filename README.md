# system_monitoring_gui

This is the GUI application of the System Monitoring project.

This project collects system metrics and shares them through peer-to-peer to other instances of itself over the network in order to supervise a whole network through a single interface.

## In the program

The application will monitor the system it is running on as well as any other system it has been ordered to monitor.

The data collected is :
- the CPU load.
- the total amount of RAM
- the amount of RAM available
- the total amount of logical disks
- the total amount of storage for each logical disk
- the amount of storage available for each logical disk
- the total amount of physical disks
- the total amount of storage for each physical disk

There are two interfaces on the web app currently :
- the main interface, which displays the CPU load and the RAM load of each system on the peer-to-peer network over time.
- the system interface which WILL display more in-depth data on the targeted system (not published yet).