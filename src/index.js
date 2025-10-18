var home_lab_data = new Map();

function create_chart(ctx, data, title){
    // new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0, ],
            datasets: [{
                label: title,
                data: data,
                fill: false,
                // borderColor: 'rgb(75, 192, 192)',
                borderColor: 'black',
                tension: 0.1,
                pointStyle: false,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black'
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            animation: false
        }
    });
}

function update_chart(chart, value){
    // new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });

    if(chart.data.labels.length == 50){
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    chart.data.labels.push(chart.data.labels.at(-1)+1);
    chart.data.datasets[0].data.push(value);
    chart.update();
}

function update_system(container, system_and_meta){
    // console.log(container)
    // console.log(system)
    let system = system_and_meta.system
    let ip = system_and_meta.ip

    container.className = "environment-system";
    if(system.accessed == 0){
        container.className += " off";
    }
    else if(system.accessed == 1){
        container.className += " on";
    }

    let elements = container.children;

    let element = elements[0];
    element.textContent = system_and_meta.ip;

    element = elements[1];
    if(system.accessed == 0){
        element.style = "display: none;";
    }
    else if(system.accessed == 1){
        element.style = "display: flex;";
    }
    let elements2 = element.children;
    let element2 = elements2[0];
    // element2.textContent = system.cpu.load_percentage+"%";
    let elements3 = element2.children;
    let element3 = elements3[0]
    // home_lab_data.get(ip).get("x").push(home_lab_data.get(ip).get("x").at(-1)+1);
    home_lab_data.get(ip).get("cpu").push(system.cpu.load_percentage);
    update_chart(home_lab_data.get(ip).get("cpu-chart"), system.cpu.load_percentage);
    element2 = elements2[1];
    // element2.textContent = Math.round(100*(system.ram.total_ram-system.ram.free_ram)/system.ram.total_ram)+"%";
    elements3 = element2.children;
    element3 = elements3[0]
    home_lab_data.get(ip).get("ram").push(Math.round(100*(system.ram.total_ram-system.ram.free_ram)/system.ram.total_ram));
    update_chart(home_lab_data.get(ip).get("ram-chart"), Math.round(100*(system.ram.total_ram-system.ram.free_ram)/system.ram.total_ram));
}

function setup_system(container, system_and_meta){
    // console.log(container)
    // console.log(system)
    let system = system_and_meta.system
    let ip = system_and_meta.ip

    container.className = "environment-system";
    if(system.accessed == 0){
        container.className += " off";
    }
    else if(system.accessed == 1){
        container.className += " on";
    }

    let element = document.createElement("h2");
    element.className = "system-ip";
    element.textContent = system_and_meta.ip;

    container.appendChild(element)

    element = document.createElement("div");
    element.className = "system-resources";
    if(system.accessed == 0){
        element.style = "display: none;";
    }
    else if(system.accessed == 1){
        element.style = "display: flex;";
    }
    let element2 = document.createElement("div");
    element2.className = "system-resources cpu";
    // element2.textContent = system.cpu.load_percentage+"%";
    let element3 = document.createElement("canvas");
    element3.className = "system-resources canvas";
    home_lab_data.set(ip, new Map());
    // home_lab_data.get(ip).set("x", new Array());
    // home_lab_data.get(ip).get("x").push(0);
    home_lab_data.get(ip).set("cpu", new Array());
    home_lab_data.get(ip).get("cpu").push(system.cpu.load_percentage);
    home_lab_data.get(ip).set("cpu-chart", create_chart(element3, home_lab_data.get(ip).get("cpu"), "cpu load"));
    element2.appendChild(element3);
    element.appendChild(element2);
    element2 = document.createElement("div");
    element2.className = "system-resources ram";
    // element2.textContent = Math.round(100*(system.ram.total_ram-system.ram.free_ram)/system.ram.total_ram)+"%";;
    element3 = document.createElement("canvas");
    element3.className = "system-resources canvas";
    home_lab_data.get(ip).set("ram", new Array());
    home_lab_data.get(ip).get("ram").push(Math.round(100*(system.ram.total_ram-system.ram.free_ram)/system.ram.total_ram));
    home_lab_data.get(ip).set("ram-chart", create_chart(element3, home_lab_data.get(ip).get("ram"), "ram load"));
    element2.appendChild(element3);
    element.appendChild(element2);

    container.appendChild(element)
}

function process_answer(data){
    // console.log(data);
    let amount_of_systems = data.size;
    let environment = data.data;
    let system_and_meta;
    let ip;
    let system;
    let container_parent = document.getElementById("home-lab");
    let container;
    let container_found;

    for(let i = 0; i < amount_of_systems; i++){
        system_and_meta = environment[i];

        ip = system_and_meta.ip;
        system = system_and_meta.system;

        container_found = 0;
        // console.log(container_parent.children[1])
        for(let j = 0; j < container_parent.childElementCount; j++){
            container = container_parent.children[j];
            if(container.id == "home-lab-"+ip){
                update_system(container, system_and_meta);
                container_found = 1;
            }
        }
        if(container_found == 0){
            container = document.createElement("div");
            container.id = "home-lab-"+ip;
            container.className = "environment-system";
            if(system.accessed == 0){
                container.className += " off";
            }
            else if(system.accessed == 1){
                container.className += " on";
            }
            container_parent.appendChild(container);
            setup_system(container, system_and_meta);
        }
    }
}

function process_disconnection(err){
    let container_parent = document.getElementById("home-lab");
    let container;
    for(let i = 0; i < container_parent.childElementCount; i++){
        container = container_parent.children[i];
        container.className = "environment-system off";
        container.children[1].style = "display: none;";
    }
}

function get_data(){
    // let data_length = data_og.byteLength;

    let tmp = new Uint8Array(16);
    tmp.set(new Uint8Array("get info"), 0)
    tmp.reverse()
    tmp = tmp.buffer;
    fetch("http://192.168.1.93:4148", {method: "POST", body: tmp, responseType: "json", signal: AbortSignal.timeout(300)})
    .then(answer => answer.json())
    .then(data => process_answer(data))
    .catch(err => process_disconnection(err))
}

// document.getElementById("get_data_button").addEventListener("click", get_data);

var intervalID = window.setInterval(get_data, 500);