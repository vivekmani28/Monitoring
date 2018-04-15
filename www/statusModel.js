var StatusModel = function (clients) {
    var self = this;
    self.clients = ko.observableArray();
    self.addClient = function (client) {
        self.clients.push(
            new ClientModel(client)
        );
    };
    self.removeClient = function (client) {
        self.clients.remove(client);
    };
    self.updateClient = function (person) {
        for (var i = 0; i < self.clients().length; i++) {
            var koObj = self.clients()[i];
            if (self.clients()[i].name() === person.name) {
                koObj.count(person.count);
                koObj.ip(person.ip);
                break;
            }
        }
    };

    for (var i = 0; i < clients.length; i++) {
        self.addClient(clients[i]);
    }
};

var ClientModel = function (client) {
    var self = this;
    self.count = ko.observable(client.count);
    self.ip = ko.observable(client.ip);
    self.name = ko.observable(client.name);
}


var viewModel = new StatusModel(
    [
        { name: "iTrust2 Instance #1 ",ip: "0.0.0.0" , count: "N/A" },
        { name: "iTrust2 Instance #2 ",ip: "0.0.0.0" , count: "N/A" },
        { name: "iTrust2 Instance #3 ",ip: "0.0.0.0" , count: "N/A" },
        { name: "iTrust2 Instance #4 ",ip: "0.0.0.0" , count: "N/A" },
        { name: "iTrust2 Instance #5 ",ip: "0.0.0.0" , count: "N/A" }
    ]);

$(document).ready(function () {
    ko.applyBindings(viewModel);
    $('#statusTable').DataTable({ "paging": false, "info": false });

    var socket = io.connect('http://localhost:3000');
    console.log(socket);

    socket.on("heartbeat", function (client) {
        console.log(client.name);
        console.log(client.count);
        viewModel.updateClient(
            {
                name: client.name,
                ip: client.ip,
                count: client.count
            });
    });
});
