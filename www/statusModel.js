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
    self.name = ko.observable(client.name);
}


var viewModel = new StatusModel(
    [
        { name: "iTrust2 Instance #1", count: "0" },
        { name: "iTrust2 Instance #2", count: "0" },
        { name: "iTrust2 Instance #3", count: "0" },
        { name: "iTrust2 Instance #4", count: "0" },
        { name: "iTrust2 Instance #5", count: "0" }
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
                count: client.count
            });
    });
});

